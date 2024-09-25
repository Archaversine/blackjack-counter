module Game.Events

import Game.Card
import Game.Types

public export
data Event 
  = IDraw Card
  | IRemove Card
  | TheyDraw Card
  | TheyRemove Card
  | NewGoal Goal
  | AddUnknown -- for them ONLY (because you will always know your cards)
  | RemoveUnknown -- for them ONLY (because you will always know your cards)
  | Reset

export
handleEvent : Event -> (1 s : GameState) -> GameState
handleEvent (IDraw c) (MkGameState d m them uns g) with (hasCard c d)
  handleEvent (IDraw c) (MkGameState d m them uns g) | (Yes prf)   = MkGameState (removeCard c d) (c :: m) them uns g
  handleEvent (IDraw c) (MkGameState d m them uns g) | (No contra) = MkGameState d m them uns g
handleEvent (IRemove c) (MkGameState d m them uns g) with (hasCard c m)
  handleEvent (IRemove c) (MkGameState d m them uns g) | (Yes prf)   = MkGameState (c :: d) (removeCard c m) them uns g
  handleEvent (IRemove c) (MkGameState d m them uns g) | (No contra) = MkGameState d m them uns g
handleEvent (TheyDraw c) (MkGameState d m them uns g) with (hasCard c d)
  handleEvent (TheyDraw c) (MkGameState d m them uns g) | (Yes prf)   = MkGameState (removeCard c d) m (c :: them) uns g
  handleEvent (TheyDraw c) (MkGameState d m them uns g) | (No contra) = MkGameState d m them uns g
handleEvent (TheyRemove c) (MkGameState d m them uns g) with (hasCard c them)
  handleEvent (TheyRemove c) (MkGameState d m them uns g) | (Yes prf)   = MkGameState (c :: d) m (removeCard c them) uns g
  handleEvent (TheyRemove c) (MkGameState d m them uns g) | (No contra) = MkGameState d m them uns g
handleEvent (NewGoal newGoal) (MkGameState d m them uns g) = MkGameState d m them uns newGoal 
handleEvent AddUnknown (MkGameState d m them uns g) = MkGameState d m them (uns + 1) g
handleEvent RemoveUnknown (MkGameState d m them uns g) = MkGameState d m them (uns `minus` 1) g
handleEvent Reset (MkGameState {}) = NewGameState

-- prove that drawing a non-existing card does nothing to the state (for both me and them)
0 iDrawBad : (c : Card) -> (s : GameState) -> (p : Not (HasCard c s.deck)) -> handleEvent (IDraw c) s = s
iDrawBad c (MkGameState d m them uns g) p with (hasCard c d)
  iDrawBad c (MkGameState d m them uns g) p | (Yes prf)   = void (p prf)
  iDrawBad c (MkGameState d m them uns g) p | (No contra) = Refl

0 theyDrawBad : (c : Card) -> (s : GameState) -> (p : Not (HasCard c s.deck)) -> handleEvent (TheyDraw c) s = s
theyDrawBad c (MkGameState d m them uns g) p with (hasCard c d)
  theyDrawBad c (MkGameState d m them uns g) p | (Yes prf)   = void (p prf)
  theyDrawBad c (MkGameState d m them uns g) p | (No contra) = Refl

-- prove that drawing a card does not affect anything else (for both me and them)
0 iDrawProof : (c : Card) 
  -> (s : GameState) 
  -> (p : HasCard c s.deck) 
  -> ( (handleEvent (IDraw c) s).them = s.them 
     , (handleEvent (IDraw c) s).unknowns = s.unknowns
     , (handleEvent (IDraw c) s).goal = s.goal
     , (handleEvent (IDraw c) s).me = c :: s.me
     )
iDrawProof c (MkGameState d m them uns g) p with (hasCard c d)
  iDrawProof c (MkGameState d m them uns g) p | (Yes prf)   = (Refl, (Refl, (Refl, Refl)))
  iDrawProof c (MkGameState d m them uns g) p | (No contra) = void (contra p)

0 theyDrawProof : (c : Card) 
  -> (s : GameState) 
  -> (p : HasCard c s.deck) 
  -> ( (handleEvent (TheyDraw c) s).me = s.me
     , (handleEvent (TheyDraw c) s).unknowns = s.unknowns
     , (handleEvent (TheyDraw c) s).goal = s.goal
     , (handleEvent (TheyDraw c) s).them = c :: s.them
     )
theyDrawProof c (MkGameState d m them uns g) p with (hasCard c d)
  theyDrawProof c (MkGameState d m them uns g) p | (Yes prf)   = (Refl, (Refl, (Refl, Refl)))
  theyDrawProof c (MkGameState d m them uns g) p | (No contra) = void (contra p)

-- prove that removing a non-exisint card does nothing to the state (for both me and them)
0 iRemoveBad : (c : Card) -> (s : GameState) -> (p : Not (HasCard c s.me)) -> handleEvent (IRemove c) s = s
iRemoveBad c (MkGameState d m them uns g) p with (hasCard c m)
  iRemoveBad c (MkGameState d m them uns g) p | (Yes prf)   = void (p prf)
  iRemoveBad c (MkGameState d m them uns g) p | (No contra) = Refl

0 theyRemoveBad : (c : Card) -> (s : GameState) -> (p : Not (HasCard c s.them)) -> handleEvent (TheyRemove c) s = s
theyRemoveBad c (MkGameState d m them uns g) p with (hasCard c them)
  theyRemoveBad c (MkGameState d m them uns g) p | (Yes prf)   = void (p prf)
  theyRemoveBad c (MkGameState d m them uns g) p | (No contra) = Refl

-- prove that removing a card does not affect anything else (for both me and them)

0 iRemoveProof : (c : Card) 
  -> (s : GameState)
  -> (p : HasCard c s.me)
  -> ( (handleEvent (IRemove c) s).them = s.them
     , (handleEvent (IRemove c) s).unknowns = s.unknowns
     , (handleEvent (IRemove c) s).goal = s.goal
     )
iRemoveProof c (MkGameState d m them uns g) p with (hasCard c m)
  iRemoveProof c (MkGameState d m them uns g) p | (Yes prf)   = (Refl, (Refl, Refl))
  iRemoveProof c (MkGameState d m them uns g) p | (No contra) = void (contra p)

0 theyRemoveProof : (c : Card) 
  -> (s : GameState)
  -> (p : HasCard c s.them)
  -> ( (handleEvent (TheyRemove c) s).me = s.me
     , (handleEvent (TheyRemove c) s).unknowns = s.unknowns
     , (handleEvent (TheyRemove c) s).goal = s.goal
     )
theyRemoveProof c (MkGameState d m them uns g) p with (hasCard c them)
  theyRemoveProof c (MkGameState d m them uns g) p | (Yes prf)   = (Refl, (Refl, Refl))
  theyRemoveProof c (MkGameState d m them uns g) p | (No contra) = void (contra p)

-- prove that adding an unknown only affects the unknown counter

0 addUnknownProof : (s : GameState)
  -> ( (handleEvent AddUnknown s).me = s.me
     , (handleEvent AddUnknown s).them = s.them
     , (handleEvent AddUnknown s).deck = s.deck
     , (handleEvent AddUnknown s).goal = s.goal
     , (handleEvent AddUnknown s).unknowns = s.unknowns + 1
     )
addUnknownProof (MkGameState d m them uns g) = (Refl, (Refl, (Refl, (Refl, Refl))))

-- prove that removing an unknown only affects the unknown counter
0 removeUnknownProof : (s : GameState)
  -> ( (handleEvent RemoveUnknown s).me = s.me
     , (handleEvent RemoveUnknown s).them = s.them
     , (handleEvent RemoveUnknown s).deck = s.deck
     , (handleEvent RemoveUnknown s).goal = s.goal
     , (handleEvent RemoveUnknown s).unknowns = s.unknowns `minus` 1
     )
removeUnknownProof (MkGameState d m them uns g) = (Refl, (Refl, (Refl, (Refl, Refl))))

-- prove that changing the goal only affects the goal counter
0 goalProof : (newGoal : Goal)
  -> (s : GameState)
  -> ( (handleEvent (NewGoal newGoal) s).me = s.me
     , (handleEvent (NewGoal newGoal) s).them = s.them
     , (handleEvent (NewGoal newGoal) s).deck = s.deck
     , (handleEvent (NewGoal newGoal) s).unknowns = s.unknowns
     , (handleEvent (NewGoal newGoal) s).goal = newGoal
     )
goalProof newGoal (MkGameState d m them uns g) = (Refl, (Refl, (Refl, (Refl, Refl))))

-- prove that resetting results in a `newGameState`
0 resetProof : (s : GameState) -> handleEvent Reset s = NewGameState
resetProof (MkGameState {}) = Refl

--handleEvent : Event -> State GameState ()
--handleEvent (IDraw k) = do 
--  s <- get
--
--  case hasCard k s.deck of 
--    Yes p => do 
--      modify $ \s => { deck := removeCard k s.deck } s
--      modify $ \s => { me   := k :: s.me } s
--    No  p => pure ()
--handleEvent (IRemove k) = do 
--  s <- get 
--
--  when (k `elem` s.me) $ do 
--    modify $ \s => { me   := removeCard k s.me } s
--    modify $ \s => { deck := k :: s.deck } s
--handleEvent (TheyDraw k) = do 
--  s <- get
--
--  when (k `elem` s.deck) $ do
--    modify $ \s => { deck := removeCard k s.deck } s
--    modify $ \s => { them := k :: s.them } s
--handleEvent (TheyRemove k) = do 
--  s <- get 
--
--  when (k `elem` s.them) $ do 
--    modify $ \s => { them := removeCard k s.them } s
--    modify $ \s => { deck := k :: s.deck } s
--handleEvent (NewGoal k) = modify $ \s => { goal := k } s
--handleEvent AddUnknown    = modify $ \s => { unknowns := s.unknowns + 1 } s
--handleEvent RemoveUnknown = modify $ \s => { unknowns := s.unknowns `minus` 1 } s
--handleEvent (Reveal k) = handleEvent RemoveUnknown *> handleEvent (TheyDraw k)
--handleEvent Reset = put newGameState
