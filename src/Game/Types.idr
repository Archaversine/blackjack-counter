module Game.Types

import Control.Monad.State

import Game.Card

public export 
data Goal = G17 | G21 | G24 | G27

export
Eq Goal where 
  G17 == G17 = True
  G21 == G21 = True
  G24 == G24 = True
  G27 == G27 = True
  _ == _ = False

export 
goalToNat : Goal -> Nat 
goalToNat G17 = 17
goalToNat G21 = 21
goalToNat G24 = 24
goalToNat G27 = 27

public export
record GameState where 
  constructor MkGameState 
  deck : List Card
  me   : List Card 
  them : List Card
  unknowns : Nat
  goal     : Goal

export
NewGameState : GameState
NewGameState = MkGameState allCards [] [] 1 G21

public export
Game : Type -> Type 
Game = StateT GameState IO


