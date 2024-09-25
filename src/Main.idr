module Main 

import Data.IORef

import Game.Card
import Game.Events
import Game.Logic
import Game.Types

import HTML.Dom

Button : Type 
Button = DomElement Void String

button : String -> Button
button = MkDomElement

data Player = Me | Them

Eq Player where 
  Me == Me = True 
  Them == Them = True 
  _ == _ = False

goalButtons : List (Button, Goal)
goalButtons = [
  (button "goal-button-17", G17),
  (button "goal-button-21", G21),
  (button "goal-button-24", G24),
  (button "goal-button-27", G27)
]

cardButtons : List (Button, Player, Card)
cardButtons = [
  (button "my-card-button-1", Me, One),
  (button "my-card-button-2", Me, Two),
  (button "my-card-button-3", Me, Three),
  (button "my-card-button-4", Me, Four),
  (button "my-card-button-5", Me, Five),
  (button "my-card-button-6", Me, Six),
  (button "my-card-button-7", Me, Seven),
  (button "my-card-button-8", Me, Eight),
  (button "my-card-button-9", Me, Nine),
  (button "my-card-button-10", Me, Ten),
  (button "my-card-button-11", Me, Eleven),

  (button "their-card-button-1", Them, One),
  (button "their-card-button-2", Them, Two),
  (button "their-card-button-3", Them, Three),
  (button "their-card-button-4", Them, Four),
  (button "their-card-button-5", Them, Five),
  (button "their-card-button-6", Them, Six),
  (button "their-card-button-7", Them, Seven),
  (button "their-card-button-8", Them, Eight),
  (button "their-card-button-9", Them, Nine),
  (button "their-card-button-10", Them, Ten),
  (button "their-card-button-11", Them, Eleven)
]

cardButtonIDs : List String
cardButtonIDs = [elem.elemID | (elem, _, _) <- cardButtons]


cardUpdateGameState : Button -> Player -> Card -> (1 s : GameState) -> GameState
cardUpdateGameState elem plr c (MkGameState d m them uns g) with (hasCard c d)
  cardUpdateGameState elem plr c (MkGameState d m them uns g) | (Yes prf)   = handleEvent (if plr == Me then IDraw c else TheyDraw c) (MkGameState d m them uns g)
  cardUpdateGameState elem plr c (MkGameState d m them uns g) | (No contra) = handleEvent (if plr == Me then IRemove c else TheyRemove c) (MkGameState d m them uns g)

data CardState = Active | Inactive

Show CardState where 
  show Active = "card-active"
  show Inactive = "card-inactive"

Eq CardState where 
  Active == Active = True 
  Inactive == Inactive = True 
  _ == _ = False

data ValueColor = Red | Green 

Show ValueColor where 
  show Red = "red"
  show Green = "green"

setColoredValue : (name : String) -> Nat -> Goal -> IO ()
setColoredValue name k g = do 
  let elem = MkDomElement {value=Void,innerHTML=Nat} name
  
  removeClass elem (show Red)
  removeClass elem (show Green)

  addClass elem (show (if k <= goalToNat g then Green else Red))
  setInnerHTML elem k

setStatValue : DomValue a => (name : String) -> a -> IO ()
setStatValue name k = setInnerHTML (MkDomElement {value=Void} name) k

mutual
  setCardState : Button -> CardState -> IO ()
  setCardState elem c = do 
    removeClass elem (show Active)
    removeClass elem (show Inactive)

    addClass elem (show c)

  getCardState : GameState -> Player -> Card -> CardState
  getCardState s p c with (hasCard c (if p == Me then s.me else s.them))
    getCardState s p c | (Yes prf)   = Active
    getCardState s p c | (No contra) = Inactive

  setGoalState : Button -> CardState -> IO ()
  setGoalState elem s = do
    removeClass elem "active-goal-button"

    when (s == Active) $ do 
      addClass elem "active-goal-button"

  getGoalState : GameState -> Goal -> CardState 
  getGoalState s g = if s.goal == g then Active else Inactive

  registerCardButtonEventListener : IORef GameState -> (Button, Player, Card) -> IO ()
  registerCardButtonEventListener ref (elem, p, inputCard) = addEventListener elem "click" $ do 
    old <- readIORef ref
    let new = cardUpdateGameState elem p inputCard old

    renderGameState new
    writeIORef ref new

  registerGoalButtonEventListener : IORef GameState -> (Button, Goal) -> IO ()
  registerGoalButtonEventListener ref (elem, g) = addEventListener elem "click" $ do 
    old <- readIORef ref 
    let new = { goal := g } old

    renderGameState new
    writeIORef ref new

  registerUnknownButtonEventListener : IORef GameState -> Button -> (increase : Bool) -> IO ()
  registerUnknownButtonEventListener ref elem increase = addEventListener elem "click" $ do 
    old <- readIORef ref 
    let new = handleEvent (if increase then AddUnknown else RemoveUnknown) old 

    renderGameState new
    writeIORef ref new

  renderButton : GameState -> (Button, Player, Card) -> IO ()
  renderButton s (elem, plr, c) = setCardState elem (getCardState s plr c)

  renderGoalButton : GameState -> (Button, Goal) -> IO ()
  renderGoalButton s (elem, g) = setGoalState elem (getGoalState s g)

  renderPerfect : String -> Player -> Maybe (Card, Bool) -> IO ()
  renderPerfect elem plr m = do 
    let e = MkDomElement {value=Void,innerHTML=String} elem

    removeClass e (show Red)
    removeClass e (show Green)

    case m of 
      Nothing => setStatValue elem "None"
      Just (c, True)  => do 
        setStatValue elem (cardToNat c)
        addClass e (show Green)
      Just (c, False) => do
        setStatValue elem (cardToNat c)
        addClass e (show Red)

  renderGameState : GameState -> IO ()
  renderGameState s = do 
    -- render all card buttons
    sequence_ $ map (renderButton s) cardButtons

    -- render all goal buttons
    sequence_ $ map (renderGoalButton s) goalButtons

    let myHand    = getHand s.me
        myLowest  = lowestPossibleScore s.me 1 s.deck
        myHighest = highestPossibleScore s.me 1 s.deck
        myPerfect = perfectCard s.me s.deck s.goal
        mySafes   = length (safeCards s.me s.deck s.goal)
        myUnsafes = length (unsafeCards s.me s.deck s.goal)
        myOdds    = cast {to=Double} mySafes / cast (mySafes + myUnsafes)

    setColoredValue "my-hand-counter" myHand s.goal
    setColoredValue "my-lowest-counter" myLowest s.goal
    setColoredValue "my-highest-counter" myHighest s.goal

    renderPerfect "my-perfect" Me myPerfect

    setStatValue "my-safe-counter" mySafes
    setStatValue "my-unsafe-counter" myUnsafes
    setStatValue "my-odds" (show (100 * myOdds) ++ "%")

    let theirHand        = getHand s.them
        theirUnknowns    = s.unknowns
        theirLowest      = lowestPossibleScore s.them theirUnknowns s.deck
        theirHighest     = highestPossibleScore s.them theirUnknowns s.deck
        theirPerfect     = perfectCard s.them s.deck s.goal
        theirLowestDraw  = lowestPossibleScore s.them (theirUnknowns + 1) s.deck
        theirHighestDraw = highestPossibleScore s.them (theirUnknowns + 1) s.deck
        theirSafes       = length (safeCards s.them s.deck s.goal)
        theirUnsafes     = length (unsafeCards s.them s.deck s.goal)
        theirOdds        = cast {to=Double} theirSafes / cast (theirSafes + theirUnsafes)

    setColoredValue "their-hand-counter" theirHand s.goal
    setColoredValue "their-lowest-counter" theirLowest s.goal
    setColoredValue "their-highest-counter" theirHighest s.goal
    setColoredValue "their-lowest-draw-counter" theirLowestDraw s.goal
    setColoredValue "their-highest-draw-counter" theirHighestDraw s.goal

    renderPerfect "their-perfect" Me theirPerfect

    setStatValue "their-safe-counter" theirSafes
    setStatValue "their-unsafe-counter" theirUnsafes
    setStatValue "their-odds" (show (100 * theirOdds) ++ "%")

    let remaining = length s.deck

    setStatValue "remaining-counter" ("Remaining Cards: " ++ show remaining)
    setStatValue "unknown-counter" s.unknowns

resetButton : Button
resetButton = MkDomElement "reset-button"

registerResetButtonListener : IORef GameState -> IO ()
registerResetButtonListener ref = addEventListener resetButton "click" $ do 
  old <- readIORef ref
  let new = handleEvent Reset old

  renderGameState new
  writeIORef ref new

main : IO ()
main = do 
  ref <- newIORef NewGameState

  -- register event listeners for card buttons
  sequence_ $ map (registerCardButtonEventListener ref) cardButtons
  
  -- register event listeners for goal buttons 
  sequence_ $ map (registerGoalButtonEventListener ref) goalButtons

  -- register event listeners for reset button
  registerResetButtonListener ref

  -- register event listeners for unknown buttons
  registerUnknownButtonEventListener ref (MkDomElement "increase-unknown") True
  registerUnknownButtonEventListener ref (MkDomElement "decrease-unknown") False
