module Game.Logic

import Data.List

import Game.Card
import Game.Types

export
getHand : List Card -> Nat
getHand = sum . map cardToNat

-- gets the n highest elements of a list 
-- NOTE: The resulting list may be less than n, all that's guaranteed
-- is that the output list will never be greater than n
nHighest : Ord a => Nat -> List a -> List a
nHighest n = take n . reverse . sort

-- this has the same assumptions as `nHighest`
nLowest : Ord a => Nat -> List a -> List a
nLowest n = take n . sort

maxOrDefault : Ord a => a -> List a -> a
maxOrDefault def = foldl max def

minOrDefault : Ord a => a -> List a -> a
minOrDefault def = foldl min def

export
highestPossibleScore : (plr : List Card) -> (unknowns : Nat) -> (deck : List Card) -> Nat
highestPossibleScore plr unknowns deck = getHand plr + sum (nHighest unknowns (map cardToNat deck))

export 
lowestPossibleScore : (plr : List Card) -> (unknowns : Nat) -> (deck : List Card) -> Nat
lowestPossibleScore plr unknowns deck = getHand plr + sum (nLowest unknowns (map cardToNat deck))

export 
safeCards : (plr : List Card) -> (deck : List Card) -> Goal -> List Card
safeCards plr deck target = [c | c <- deck, getHand plr + cardToNat c <= goalToNat target]

export 
unsafeCards : (plr : List Card) -> (deck : List Card) -> Goal -> List Card
unsafeCards plr deck target = [c | c <- deck, getHand plr + cardToNat c > goalToNat target]

-- returns a perfect card if such a card can exist
-- if said card can exist, then a bool is also returned indicating if the card is in the deck
export 
perfectCard : (plr : List Card) -> (deck : List Card) -> Goal -> Maybe (Card, Bool)
perfectCard plr deck target with (fromNatMaybe (goalToNat target `minus` getHand plr))
  perfectCard plr deck target | Nothing  = Nothing
  perfectCard plr deck target | (Just p) with (hasCard p deck)
    perfectCard plr deck target | (Just p) | (Yes prf)   = Just (p, True)
    perfectCard plr deck target | (Just p) | (No contra) = Just (p, False)

