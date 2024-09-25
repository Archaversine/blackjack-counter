module Game.Card

import Data.So
import Decidable.Equality

public export 
data Card
  = One
  | Two
  | Three
  | Four
  | Five
  | Six
  | Seven
  | Eight
  | Nine
  | Ten
  | Eleven

export
allCards : List Card
allCards = [One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten, Eleven]

Eq Card where
  One == One = True
  Two == Two = True
  Three == Three = True
  Four == Four = True
  Five == Five = True
  Six == Six = True
  Seven == Seven = True
  Eight == Eight = True
  Nine == Nine = True
  Ten == Ten = True
  Eleven == Eleven = True
  _ == _ = False

DecEq Card where 
  decEq One One  = Yes Refl
  decEq One Two  = No (\case Refl impossible)
  decEq One Three  = No (\case Refl impossible)
  decEq One Four  = No (\case Refl impossible)
  decEq One Five  = No (\case Refl impossible)
  decEq One Six  = No (\case Refl impossible)
  decEq One Seven  = No (\case Refl impossible)
  decEq One Eight  = No (\case Refl impossible)
  decEq One Nine  = No (\case Refl impossible)
  decEq One Ten  = No (\case Refl impossible)
  decEq One Eleven  = No (\case Refl impossible)
  decEq Two One  = No (\case Refl impossible)
  decEq Two Two  = Yes Refl
  decEq Two Three  = No (\case Refl impossible)
  decEq Two Four  = No (\case Refl impossible)
  decEq Two Five  = No (\case Refl impossible)
  decEq Two Six  = No (\case Refl impossible)
  decEq Two Seven  = No (\case Refl impossible)
  decEq Two Eight  = No (\case Refl impossible)
  decEq Two Nine  = No (\case Refl impossible)
  decEq Two Ten  = No (\case Refl impossible)
  decEq Two Eleven  = No (\case Refl impossible)
  decEq Three One  = No (\case Refl impossible)
  decEq Three Two  = No (\case Refl impossible)
  decEq Three Three  = Yes Refl
  decEq Three Four  = No (\case Refl impossible)
  decEq Three Five  = No (\case Refl impossible)
  decEq Three Six  = No (\case Refl impossible)
  decEq Three Seven  = No (\case Refl impossible)
  decEq Three Eight  = No (\case Refl impossible)
  decEq Three Nine  = No (\case Refl impossible)
  decEq Three Ten  = No (\case Refl impossible)
  decEq Three Eleven  = No (\case Refl impossible)
  decEq Four One  = No (\case Refl impossible)
  decEq Four Two  = No (\case Refl impossible)
  decEq Four Three  = No (\case Refl impossible)
  decEq Four Four  = Yes Refl
  decEq Four Five  = No (\case Refl impossible)
  decEq Four Six  = No (\case Refl impossible)
  decEq Four Seven  = No (\case Refl impossible)
  decEq Four Eight  = No (\case Refl impossible)
  decEq Four Nine  = No (\case Refl impossible)
  decEq Four Ten  = No (\case Refl impossible)
  decEq Four Eleven  = No (\case Refl impossible)
  decEq Five One  = No (\case Refl impossible)
  decEq Five Two  = No (\case Refl impossible)
  decEq Five Three  = No (\case Refl impossible)
  decEq Five Four  = No (\case Refl impossible)
  decEq Five Five  = Yes Refl
  decEq Five Six  = No (\case Refl impossible)
  decEq Five Seven  = No (\case Refl impossible)
  decEq Five Eight  = No (\case Refl impossible)
  decEq Five Nine  = No (\case Refl impossible)
  decEq Five Ten  = No (\case Refl impossible)
  decEq Five Eleven  = No (\case Refl impossible)
  decEq Six One  = No (\case Refl impossible)
  decEq Six Two  = No (\case Refl impossible)
  decEq Six Three  = No (\case Refl impossible)
  decEq Six Four  = No (\case Refl impossible)
  decEq Six Five  = No (\case Refl impossible)
  decEq Six Six  = Yes Refl
  decEq Six Seven  = No (\case Refl impossible)
  decEq Six Eight  = No (\case Refl impossible)
  decEq Six Nine  = No (\case Refl impossible)
  decEq Six Ten  = No (\case Refl impossible)
  decEq Six Eleven  = No (\case Refl impossible)
  decEq Seven One  = No (\case Refl impossible)
  decEq Seven Two  = No (\case Refl impossible)
  decEq Seven Three  = No (\case Refl impossible)
  decEq Seven Four  = No (\case Refl impossible)
  decEq Seven Five  = No (\case Refl impossible)
  decEq Seven Six  = No (\case Refl impossible)
  decEq Seven Seven  = Yes Refl
  decEq Seven Eight  = No (\case Refl impossible)
  decEq Seven Nine  = No (\case Refl impossible)
  decEq Seven Ten  = No (\case Refl impossible)
  decEq Seven Eleven  = No (\case Refl impossible)
  decEq Eight One  = No (\case Refl impossible)
  decEq Eight Two  = No (\case Refl impossible)
  decEq Eight Three  = No (\case Refl impossible)
  decEq Eight Four  = No (\case Refl impossible)
  decEq Eight Five  = No (\case Refl impossible)
  decEq Eight Six  = No (\case Refl impossible)
  decEq Eight Seven  = No (\case Refl impossible)
  decEq Eight Eight  = Yes Refl
  decEq Eight Nine  = No (\case Refl impossible)
  decEq Eight Ten  = No (\case Refl impossible)
  decEq Eight Eleven  = No (\case Refl impossible)
  decEq Nine One  = No (\case Refl impossible)
  decEq Nine Two  = No (\case Refl impossible)
  decEq Nine Three  = No (\case Refl impossible)
  decEq Nine Four  = No (\case Refl impossible)
  decEq Nine Five  = No (\case Refl impossible)
  decEq Nine Six  = No (\case Refl impossible)
  decEq Nine Seven  = No (\case Refl impossible)
  decEq Nine Eight  = No (\case Refl impossible)
  decEq Nine Nine  = Yes Refl
  decEq Nine Ten  = No (\case Refl impossible)
  decEq Nine Eleven  = No (\case Refl impossible)
  decEq Ten One  = No (\case Refl impossible)
  decEq Ten Two  = No (\case Refl impossible)
  decEq Ten Three  = No (\case Refl impossible)
  decEq Ten Four  = No (\case Refl impossible)
  decEq Ten Five  = No (\case Refl impossible)
  decEq Ten Six  = No (\case Refl impossible)
  decEq Ten Seven  = No (\case Refl impossible)
  decEq Ten Eight  = No (\case Refl impossible)
  decEq Ten Nine  = No (\case Refl impossible)
  decEq Ten Ten  = Yes Refl
  decEq Ten Eleven  = No (\case Refl impossible)
  decEq Eleven One  = No (\case Refl impossible)
  decEq Eleven Two  = No (\case Refl impossible)
  decEq Eleven Three  = No (\case Refl impossible)
  decEq Eleven Four  = No (\case Refl impossible)
  decEq Eleven Five  = No (\case Refl impossible)
  decEq Eleven Six  = No (\case Refl impossible)
  decEq Eleven Seven  = No (\case Refl impossible)
  decEq Eleven Eight  = No (\case Refl impossible)
  decEq Eleven Nine  = No (\case Refl impossible)
  decEq Eleven Ten  = No (\case Refl impossible)
  decEq Eleven Eleven  = Yes Refl
  
export
isCard : Nat -> Bool 
isCard n = n `elem` [1 .. 11]

export 
cardToNat : Card -> Nat
cardToNat One = 1
cardToNat Two = 2
cardToNat Three = 3
cardToNat Four = 4
cardToNat Five = 5
cardToNat Six = 6
cardToNat Seven = 7
cardToNat Eight = 8
cardToNat Nine = 9
cardToNat Ten = 10
cardToNat Eleven = 11

export
fromNat : (n : Nat) -> {auto 0 p : So (isCard n)} -> Card
fromNat 1  = One
fromNat 2  = Two
fromNat 3  = Three
fromNat 4  = Four
fromNat 5  = Five
fromNat 6  = Six
fromNat 7  = Seven
fromNat 8  = Eight
fromNat 9  = Nine
fromNat 10 = Ten
fromNat 11 = Eleven
fromNat n = assert_total idris_crash "impossible"

export
fromNatMaybe : Nat -> Maybe Card
fromNatMaybe 1  = Just One
fromNatMaybe 2  = Just Two
fromNatMaybe 3  = Just Three
fromNatMaybe 4  = Just Four
fromNatMaybe 5  = Just Five
fromNatMaybe 6  = Just Six
fromNatMaybe 7  = Just Seven
fromNatMaybe 8  = Just Eight
fromNatMaybe 9  = Just Nine
fromNatMaybe 10 = Just Ten
fromNatMaybe 11 = Just Eleven
fromNatMaybe n = Nothing

public export
data HasCard : Card -> List Card -> Type where
  Here  : HasCard c (c :: xs)
  There : HasCard c xs -> HasCard c (x :: xs)

Uninhabited (HasCard c []) where uninhabited x impossible

hasCard_rhs_2_rhs2_1_rhs1_1 : (HasCard c xs -> Void) -> (c = x -> Void) -> HasCard c (x :: xs) -> Void
hasCard_rhs_2_rhs2_1_rhs1_1 f contra Here = void (contra Refl)
hasCard_rhs_2_rhs2_1_rhs1_1 f contra (There y) = void (f y)

export
hasCard : (c : Card) -> (xs : List Card) -> Dec (HasCard c xs)
hasCard c [] = No uninhabited
hasCard c (x :: xs) with (decEq c x)
  hasCard c (x :: xs) | (Yes prf)   = rewrite prf in Yes Here
  hasCard c (x :: xs) | (No contra) with (hasCard c xs)
    hasCard c (x :: xs) | (No contra) | (Yes prf) = Yes (There prf)
    hasCard c (x :: xs) | (No contra) | (No f)    = No (hasCard_rhs_2_rhs2_1_rhs1_1 f contra)

export 
removeCard : (c : Card) -> (xs : List Card) -> {auto p : HasCard c xs} -> List Card
removeCard c (c :: xs) @{Here} = xs
removeCard c (x :: xs) @{(There p)} = x :: removeCard c xs

