class IdrisError extends Error { }

function __prim_js2idris_array(x){
  let acc = { h:0 };

  for (let i = x.length-1; i>=0; i--) {
      acc = { a1:x[i], a2:acc };
  }
  return acc;
}

function __prim_idris2js_array(x){
  const result = Array();
  while (x.h === undefined) {
    result.push(x.a1); x = x.a2;
  }
  return result;
}

function __lazy(thunk) {
  let res;
  return function () {
    if (thunk === undefined) return res;
    res = thunk();
    thunk = undefined;
    return res;
  };
};

function __prim_stringIteratorNew(_str) {
  return 0
}

function __prim_stringIteratorToString(_, str, it, f) {
  return f(str.slice(it))
}

function __prim_stringIteratorNext(str, it) {
  if (it >= str.length)
    return {h: 0};
  else
    return {a1: str.charAt(it), a2: it + 1};
}

function __tailRec(f,ini) {
  let obj = ini;
  while(true){
    switch(obj.h){
      case 0: return obj.a1;
      default: obj = f(obj);
    }
  }
}

const _idrisworld = Symbol('idrisworld')

const _crashExp = x=>{throw new IdrisError(x)}

const _bigIntOfString = s=> {
  try {
    const idx = s.indexOf('.')
    return idx === -1 ? BigInt(s) : BigInt(s.slice(0, idx))
  } catch (e) { return 0n }
}

const _numberOfString = s=> {
  try {
    const res = Number(s);
    return isNaN(res) ? 0 : res;
  } catch (e) { return 0 }
}

const _intOfString = s=> Math.trunc(_numberOfString(s))

const _truncToChar = x=> String.fromCodePoint(
  (x >= 0 && x <= 55295) || (x >= 57344 && x <= 1114111) ? x : 0
)

// Int8
const _truncInt8 = x => {
  const res = x & 0xff;
  return res >= 0x80 ? res - 0x100 : res;
}

const _truncBigInt8 = x => Number(BigInt.asIntN(8, x))

// Euclidian Division
const _div = (a,b) => {
  const q = Math.trunc(a / b)
  const r = a % b
  return r < 0 ? (b > 0 ? q - 1 : q + 1) : q
}

const _divBigInt = (a,b) => {
  const q = a / b
  const r = a % b
  return r < 0n ? (b > 0n ? q - 1n : q + 1n) : q
}

// Euclidian Modulo
const _mod = (a,b) => {
  const r = a % b
  return r < 0 ? (b > 0 ? r + b : r - b) : r
}

const _modBigInt = (a,b) => {
  const r = a % b
  return r < 0n ? (b > 0n ? r + b : r - b) : r
}

const _add8s = (a,b) => _truncInt8(a + b)
const _sub8s = (a,b) => _truncInt8(a - b)
const _mul8s = (a,b) => _truncInt8(a * b)
const _div8s = (a,b) => _truncInt8(_div(a,b))
const _shl8s = (a,b) => _truncInt8(a << b)
const _shr8s = (a,b) => _truncInt8(a >> b)

// Int16
const _truncInt16 = x => {
  const res = x & 0xffff;
  return res >= 0x8000 ? res - 0x10000 : res;
}

const _truncBigInt16 = x => Number(BigInt.asIntN(16, x))

const _add16s = (a,b) => _truncInt16(a + b)
const _sub16s = (a,b) => _truncInt16(a - b)
const _mul16s = (a,b) => _truncInt16(a * b)
const _div16s = (a,b) => _truncInt16(_div(a,b))
const _shl16s = (a,b) => _truncInt16(a << b)
const _shr16s = (a,b) => _truncInt16(a >> b)

//Int32
const _truncInt32 = x => x & 0xffffffff

const _truncBigInt32 = x => Number(BigInt.asIntN(32, x))

const _add32s = (a,b) => _truncInt32(a + b)
const _sub32s = (a,b) => _truncInt32(a - b)
const _div32s = (a,b) => _truncInt32(_div(a,b))

const _mul32s = (a,b) => {
  const res = a * b;
  if (res <= Number.MIN_SAFE_INTEGER || res >= Number.MAX_SAFE_INTEGER) {
    return _truncInt32((a & 0xffff) * b + (b & 0xffff) * (a & 0xffff0000))
  } else {
    return _truncInt32(res)
  }
}

//Int64
const _truncBigInt64 = x => BigInt.asIntN(64, x)

const _add64s = (a,b) => _truncBigInt64(a + b)
const _sub64s = (a,b) => _truncBigInt64(a - b)
const _mul64s = (a,b) => _truncBigInt64(a * b)
const _shl64s = (a,b) => _truncBigInt64(a << b)
const _div64s = (a,b) => _truncBigInt64(_divBigInt(a,b))
const _shr64s = (a,b) => _truncBigInt64(a >> b)

//Bits8
const _truncUInt8 = x => x & 0xff

const _truncUBigInt8 = x => Number(BigInt.asUintN(8, x))

const _add8u = (a,b) => (a + b) & 0xff
const _sub8u = (a,b) => (a - b) & 0xff
const _mul8u = (a,b) => (a * b) & 0xff
const _div8u = (a,b) => Math.trunc(a / b)
const _shl8u = (a,b) => (a << b) & 0xff
const _shr8u = (a,b) => (a >> b) & 0xff

//Bits16
const _truncUInt16 = x => x & 0xffff

const _truncUBigInt16 = x => Number(BigInt.asUintN(16, x))

const _add16u = (a,b) => (a + b) & 0xffff
const _sub16u = (a,b) => (a - b) & 0xffff
const _mul16u = (a,b) => (a * b) & 0xffff
const _div16u = (a,b) => Math.trunc(a / b)
const _shl16u = (a,b) => (a << b) & 0xffff
const _shr16u = (a,b) => (a >> b) & 0xffff

//Bits32
const _truncUBigInt32 = x => Number(BigInt.asUintN(32, x))

const _truncUInt32 = x => {
  const res = x & -1;
  return res < 0 ? res + 0x100000000 : res;
}

const _add32u = (a,b) => _truncUInt32(a + b)
const _sub32u = (a,b) => _truncUInt32(a - b)
const _mul32u = (a,b) => _truncUInt32(_mul32s(a,b))
const _div32u = (a,b) => Math.trunc(a / b)

const _shl32u = (a,b) => _truncUInt32(a << b)
const _shr32u = (a,b) => _truncUInt32(a <= 0x7fffffff ? a >> b : (b == 0 ? a : (a >> b) ^ ((-0x80000000) >> (b-1))))
const _and32u = (a,b) => _truncUInt32(a & b)
const _or32u = (a,b)  => _truncUInt32(a | b)
const _xor32u = (a,b) => _truncUInt32(a ^ b)

//Bits64
const _truncUBigInt64 = x => BigInt.asUintN(64, x)

const _add64u = (a,b) => BigInt.asUintN(64, a + b)
const _mul64u = (a,b) => BigInt.asUintN(64, a * b)
const _div64u = (a,b) => a / b
const _shl64u = (a,b) => BigInt.asUintN(64, a << b)
const _shr64u = (a,b) => BigInt.asUintN(64, a >> b)
const _sub64u = (a,b) => BigInt.asUintN(64, a - b)

//String
const _strReverse = x => x.split('').reverse().join('')

const _substr = (o,l,x) => x.slice(o, o + l)

const HTML_Dom_prim__setInnerHTML = ((name,v)=>document.getElementById(name).innerHTML = v);
const HTML_Dom_prim__removeClass = ((name,c)=>document.getElementById(name).classList.remove(c));
const HTML_Dom_prim__addEventListener = ((name,etype,handler)=>document.getElementById(name).addEventListener(etype,handler));
const HTML_Dom_prim__addClass = ((name,c)=>document.getElementById(name).classList.add(c));
/* {$tcOpt:1} */
function x24tcOpt_1($0) {
 switch($0.a3.h) {
  case undefined: /* cons */ {
   switch($0.a3.a2.h) {
    case undefined: /* cons */ {
     switch($0.a4.h) {
      case undefined: /* cons */ return {h: 1 /* {TcContinue1:1} */, a1: $0.a1, a2: $0.a2, a3: $0.a3.a2.a2, a4: $0.a4.a2, a5: $a => $0.a5({a1: $0.a4.a1, a2: $a})};
      default: return {h: 0 /* {TcDone:1} */, a1: {a1: $0.a4, a2: $0.a5({h: 0})}};
     }
    }
    default: return {h: 0 /* {TcDone:1} */, a1: {a1: $0.a4, a2: $0.a5({h: 0})}};
   }
  }
  default: return {h: 0 /* {TcDone:1} */, a1: {a1: $0.a4, a2: $0.a5({h: 0})}};
 }
}

/* Data.List.7827:8306:splitRec */
function Data_List_n__7827_8306_splitRec($0, $1, $2, $3, $4) {
 return __tailRec(x24tcOpt_1, {h: 1 /* {TcContinue1:1} */, a1: $0, a2: $1, a3: $2, a4: $3, a5: $4});
}

/* {$tcOpt:2} */
function x24tcOpt_2($0) {
 switch($0.a3.h) {
  case 0: /* nil */ return {h: 0 /* {TcDone:2} */, a1: $0.a2};
  case undefined: /* cons */ return {h: 1 /* {TcContinue2:1} */, a1: $0.a1, a2: $0.a1($0.a2)($0.a3.a1), a3: $0.a3.a2};
 }
}

/* Prelude.Types.foldl */
function Prelude_Types_foldl_Foldable_List($0, $1, $2) {
 return __tailRec(x24tcOpt_2, {h: 1 /* {TcContinue2:1} */, a1: $0, a2: $1, a3: $2});
}

/* {$tcOpt:3} */
function x24tcOpt_3($0) {
 switch($0.a3.h) {
  case undefined: /* cons */ return {h: 1 /* {TcContinue3:1} */, a1: {a1: $0.a1, a2: $0.a2($0.a3.a1)}, a2: $0.a2, a3: $0.a3.a2};
  case 0: /* nil */ return {h: 0 /* {TcDone:3} */, a1: Prelude_Types_SnocList_x3cx3ex3e($0.a1, {h: 0})};
 }
}

/* Prelude.Types.List.mapAppend : SnocList b -> (a -> b) -> List a -> List b */
function Prelude_Types_List_mapAppend($0, $1, $2) {
 return __tailRec(x24tcOpt_3, {h: 1 /* {TcContinue3:1} */, a1: $0, a2: $1, a3: $2});
}

/* {$tcOpt:4} */
function x24tcOpt_4($0) {
 switch($0.a3.h) {
  case 0: /* nil */ return {h: 0 /* {TcDone:4} */, a1: Prelude_Types_List_reverse($0.a2)};
  case undefined: /* cons */ return {h: 1 /* {TcContinue4:1} */, a1: $0.a1, a2: Prelude_Types_List_reverseOnto($0.a2, $0.a1($0.a3.a1)), a3: $0.a3.a2};
 }
}

/* Prelude.Types.listBindOnto : (a -> List b) -> List b -> List a -> List b */
function Prelude_Types_listBindOnto($0, $1, $2) {
 return __tailRec(x24tcOpt_4, {h: 1 /* {TcContinue4:1} */, a1: $0, a2: $1, a3: $2});
}

/* {$tcOpt:5} */
function x24tcOpt_5($0) {
 switch($0.a2.h) {
  case 0: /* nil */ return {h: 0 /* {TcDone:5} */, a1: $0.a1};
  case undefined: /* cons */ return {h: 1 /* {TcContinue5:1} */, a1: {a1: $0.a2.a1, a2: $0.a1}, a2: $0.a2.a2};
 }
}

/* Prelude.Types.List.reverseOnto : List a -> List a -> List a */
function Prelude_Types_List_reverseOnto($0, $1) {
 return __tailRec(x24tcOpt_5, {h: 1 /* {TcContinue5:1} */, a1: $0, a2: $1});
}

/* {$tcOpt:6} */
function x24tcOpt_6($0) {
 switch($0.a2.h) {
  case 0: /* nil */ return {h: 0 /* {TcDone:6} */, a1: $0.a1};
  case undefined: /* cons */ return {h: 1 /* {TcContinue6:1} */, a1: ($0.a1+1n), a2: $0.a2.a2};
 }
}

/* Prelude.Types.List.lengthPlus : Nat -> List a -> Nat */
function Prelude_Types_List_lengthPlus($0, $1) {
 return __tailRec(x24tcOpt_6, {h: 1 /* {TcContinue6:1} */, a1: $0, a2: $1});
}

/* {$tcOpt:7} */
function x24tcOpt_7($0) {
 switch($0.a1.h) {
  case 0: /* nil */ return {h: 0 /* {TcDone:7} */, a1: $0.a2};
  case undefined: /* cons */ return {h: 1 /* {TcContinue7:1} */, a1: $0.a1.a1, a2: {a1: $0.a1.a2, a2: $0.a2}};
 }
}

/* Prelude.Types.SnocList.(<>>) : SnocList a -> List a -> List a */
function Prelude_Types_SnocList_x3cx3ex3e($0, $1) {
 return __tailRec(x24tcOpt_7, {h: 1 /* {TcContinue7:1} */, a1: $0, a2: $1});
}

/* {__mainExpression:0} */
function __mainExpression_0() {
 return PrimIO_unsafePerformIO($2 => Main_main($2));
}

/* {csegen:6} */
const csegen_6 = __lazy(function () {
 return () => {
  const $a = b => a => $b => $c => $d => {
   const $e = $b($d);
   const $11 = $c($d);
   return $e($11);
  };
  return {a1: b => a => func => $1 => $2 => Prelude_IO_map_Functor_IO(func, $1, $2), a2: a => $8 => $9 => $8, a3: $a};
 };
});

/* {csegen:13} */
const csegen_13 = __lazy(function () {
 return () => {
  const $4 = b => a => $5 => $6 => $7 => {
   const $8 = $5($7);
   return $6($8)($7);
  };
  const $f = a => $10 => $11 => {
   const $12 = $10($11);
   return $12($11);
  };
  const $0 = {a1: csegen_6()(), a2: $4, a3: $f};
  return {a1: $0, a2: a => $18 => $18};
 };
});

/* {csegen:14} */
const csegen_14 = __lazy(function () {
 return () => ({a1: $1 => HTML_Dom_toDomValue_DomValue_Nat($1), a2: $5 => HTML_Dom_fromDomValue_DomValue_Nat($5)});
});

/* {csegen:16} */
const csegen_16 = __lazy(function () {
 return () => ({a1: $1 => $1, a2: $3 => $3});
});

/* {csegen:31} */
const csegen_31 = __lazy(function () {
 return {a1: acc => elem => func => init => input => Prelude_Types_foldr_Foldable_List(func, init, input), a2: elem => acc => func => init => input => Prelude_Types_foldl_Foldable_List(func, init, input), a3: elem => $b => Prelude_Types_null_Foldable_List($b), a4: elem => acc => m => $f => funcM => init => input => Prelude_Types_foldlM_Foldable_List($f, funcM, init, input), a5: elem => $16 => $16, a6: a => m => $18 => f => $19 => Prelude_Types_foldMap_Foldable_List($18, f, $19)};
});

/* {csegen:104} */
const csegen_104 = __lazy(function () {
 return {a1: {a1: b => a => func => $2 => Prelude_Types_List_mapAppend({h: 0}, func, $2), a2: a => $8 => Prelude_Types_pure_Applicative_List($8), a3: b => a => $c => $d => Prelude_Types_x3cx2ax3e_Applicative_List($c, $d)}, a2: a => ({h: 0}), a3: a => $13 => $14 => Prelude_Types_List_tailRecAppend($13, $14())};
});

/* {csegen:107} */
const csegen_107 = __lazy(function () {
 return {a1: $1 => $2 => ($1+$2), a2: $6 => $7 => ($6*$7), a3: $b => Prelude_Types_prim__integerToNat($b)};
});

/* {csegen:118} */
const csegen_118 = __lazy(function () {
 return {a1: {a1: $2 => $3 => (($2===$3)?1:0), a2: $7 => $8 => Prelude_Types_x2fx3d_Eq_Nat($7, $8)}, a2: $d => $e => Prelude_EqOrd_compare_Ord_Integer($d, $e), a3: $13 => $14 => Prelude_Types_x3c_Ord_Nat($13, $14), a4: $19 => $1a => Prelude_Types_x3e_Ord_Nat($19, $1a), a5: $1f => $20 => Prelude_Types_x3cx3d_Ord_Nat($1f, $20), a6: $25 => $26 => Prelude_Types_x3ex3d_Ord_Nat($25, $26), a7: $2b => $2c => Prelude_Types_max_Ord_Nat($2b, $2c), a8: $31 => $32 => Prelude_Types_min_Ord_Nat($31, $32)};
});

/* prim__sub_Integer : Integer -> Integer -> Integer */
function prim__sub_Integer($0, $1) {
 return ($0-$1);
}

/* Main.with block in getCardState */
function Main_with__getCardState_2282($0, $1, $2, $3) {
 switch($3.h) {
  case 0: /* Yes */ return 0;
  case 1: /* No */ return 1;
 }
}

/* Main.with block in cardUpdateGameState */
function Main_with__cardUpdateGameState_1766($0, $1, $2, $3, $4, $5, $6, $7, $8) {
 switch($2.h) {
  case 0: /* Yes */ {
   let $b;
   switch(Main_x3dx3d_Eq_Player($7, 0)) {
    case 1: {
     $b = {h: 0 /* IDraw */, a1: $1};
     break;
    }
    case 0: {
     $b = {h: 2 /* TheyDraw */, a1: $1};
     break;
    }
   }
   return Game_Events_handleEvent($b, {a1: $0, a2: $6, a3: $5, a4: $4, a5: $3});
  }
  case 1: /* No */ {
   let $19;
   switch(Main_x3dx3d_Eq_Player($7, 0)) {
    case 1: {
     $19 = {h: 1 /* IRemove */, a1: $1};
     break;
    }
    case 0: {
     $19 = {h: 3 /* TheyRemove */, a1: $1};
     break;
    }
   }
   return Game_Events_handleEvent($19, {a1: $0, a2: $6, a3: $5, a4: $4, a5: $3});
  }
 }
}

/* Main.show */
function Main_show_Show_ValueColor($0) {
 switch($0) {
  case 0: return 'red';
  case 1: return 'green';
 }
}

/* Main.show */
function Main_show_Show_CardState($0) {
 switch($0) {
  case 0: return 'card-active';
  case 1: return 'card-inactive';
 }
}

/* Main.== */
function Main_x3dx3d_Eq_Player($0, $1) {
 switch($0) {
  case 0: {
   switch($1) {
    case 0: return 1;
    default: return 0;
   }
  }
  case 1: {
   switch($1) {
    case 1: return 1;
    default: return 0;
   }
  }
  default: return 0;
 }
}

/* Main.== */
function Main_x3dx3d_Eq_CardState($0, $1) {
 switch($0) {
  case 0: {
   switch($1) {
    case 0: return 1;
    default: return 0;
   }
  }
  case 1: {
   switch($1) {
    case 1: return 1;
    default: return 0;
   }
  }
  default: return 0;
 }
}

/* Main.setStatValue : DomValue a => String -> a -> IO () */
function Main_setStatValue($0, $1, $2) {
 return HTML_Dom_setInnerHTML({a1: csegen_13()(), a2: $0}, $1, $2);
}

/* Main.setGoalState : Button -> CardState -> IO () */
function Main_setGoalState($0, $1, $2) {
 const $3 = HTML_Dom_removeClass(csegen_13()(), $0, 'active-goal-button')($2);
 return Prelude_Interfaces_when(csegen_6()(), Main_x3dx3d_Eq_CardState($1, 0), () => HTML_Dom_addClass(csegen_13()(), $0, 'active-goal-button'))($2);
}

/* Main.setColoredValue : String -> Nat -> Goal -> IO () */
function Main_setColoredValue($0, $1, $2, $3) {
 const $4 = HTML_Dom_removeClass(csegen_13()(), $0, Main_show_Show_ValueColor(0))($3);
 const $f = HTML_Dom_removeClass(csegen_13()(), $0, Main_show_Show_ValueColor(1))($3);
 let $23;
 switch(Prelude_Types_x3cx3d_Ord_Nat($1, Game_Types_goalToNat($2))) {
  case 1: {
   $23 = 1;
   break;
  }
  case 0: {
   $23 = 0;
   break;
  }
 }
 const $21 = Main_show_Show_ValueColor($23);
 const $1b = HTML_Dom_addClass(csegen_13()(), $0, $21);
 const $1a = $1b($3);
 return HTML_Dom_setInnerHTML({a1: csegen_13()(), a2: csegen_14()()}, $0, $1)($3);
}

/* Main.setCardState : Button -> CardState -> IO () */
function Main_setCardState($0, $1, $2) {
 const $3 = HTML_Dom_removeClass(csegen_13()(), $0, Main_show_Show_CardState(0))($2);
 const $e = HTML_Dom_removeClass(csegen_13()(), $0, Main_show_Show_CardState(1))($2);
 return HTML_Dom_addClass(csegen_13()(), $0, Main_show_Show_CardState($1))($2);
}

/* Main.resetButton : Button */
const Main_resetButton = __lazy(function () {
 return 'reset-button';
});

/* Main.renderPerfect : String -> Player -> Maybe (Card, Bool) -> IO () */
function Main_renderPerfect($0, $1, $2, $3) {
 const $4 = HTML_Dom_removeClass(csegen_13()(), $0, Main_show_Show_ValueColor(0))($3);
 const $f = HTML_Dom_removeClass(csegen_13()(), $0, Main_show_Show_ValueColor(1))($3);
 let $1b;
 switch($2.h) {
  case 0: /* nothing */ {
   $1b = () => Main_setStatValue(csegen_16()(), $0, 'None');
   break;
  }
  case undefined: /* just */ {
   switch($2.a1.a2) {
    case 1: {
     $1b = () => $25 => {
      const $26 = Main_setStatValue(csegen_14()(), $0, Game_Card_cardToNat($2.a1.a1))($25);
      return HTML_Dom_addClass(csegen_13()(), $0, Main_show_Show_ValueColor(1))($25);
     };
     break;
    }
    case 0: {
     $1b = () => $3b => {
      const $3c = Main_setStatValue(csegen_14()(), $0, Game_Card_cardToNat($2.a1.a1))($3b);
      return HTML_Dom_addClass(csegen_13()(), $0, Main_show_Show_ValueColor(0))($3b);
     };
     break;
    }
   }
   break;
  }
 }
 const $1a = $1b();
 return $1a($3);
}

/* Main.renderGoalButton : GameState -> (Button, Goal) -> IO () */
function Main_renderGoalButton($0, $1, $2) {
 return Main_setGoalState($1.a1, Main_getGoalState($0, $1.a2), $2);
}

/* Main.renderGameState : GameState -> IO () */
function Main_renderGameState($0, $1) {
 const $2 = Prelude_Interfaces_sequence_(csegen_6()(), csegen_31(), Prelude_Types_List_mapAppend({h: 0}, $e => Main_renderButton($0, $e), Main_cardButtons()))($1);
 const $15 = Prelude_Interfaces_sequence_(csegen_6()(), csegen_31(), Prelude_Types_List_mapAppend({h: 0}, $21 => $22 => Main_renderGoalButton($0, $21, $22), Main_goalButtons()))($1);
 const $2c = Game_Logic_getHand($0.a2);
 const $30 = Game_Logic_lowestPossibleScore($0.a2, 1n, $0.a1);
 const $37 = Game_Logic_highestPossibleScore($0.a2, 1n, $0.a1);
 const $3e = Game_Logic_perfectCard($0.a2, $0.a1, $0.a5);
 const $46 = Prelude_Types_List_lengthTR(Game_Logic_safeCards($0.a2, $0.a1, $0.a5));
 const $50 = Prelude_Types_List_lengthTR(Game_Logic_unsafeCards($0.a2, $0.a1, $0.a5));
 const $5a = (Number($46)/Number(($46+$50)));
 const $2b = () => $61 => {
  const $62 = Main_setColoredValue('my-hand-counter', $2c, $0.a5, $61);
  const $69 = Main_setColoredValue('my-lowest-counter', $30, $0.a5, $61);
  const $70 = Main_setColoredValue('my-highest-counter', $37, $0.a5, $61);
  const $77 = Main_renderPerfect('my-perfect', 0, $3e, $61);
  const $7d = Main_setStatValue(csegen_14()(), 'my-safe-counter', $46)($61);
  const $86 = Main_setStatValue(csegen_14()(), 'my-unsafe-counter', $50)($61);
  const $8f = Main_setStatValue(csegen_16()(), 'my-odds', (Prelude_Show_show_Show_Double((Number(100n)*$5a))+'%'))($61);
  const $a1 = Game_Logic_getHand($0.a3);
  const $a5 = $0.a4;
  const $a7 = Game_Logic_lowestPossibleScore($0.a3, $a5, $0.a1);
  const $ae = Game_Logic_highestPossibleScore($0.a3, $a5, $0.a1);
  const $b5 = Game_Logic_perfectCard($0.a3, $0.a1, $0.a5);
  const $bd = Game_Logic_lowestPossibleScore($0.a3, ($a5+1n), $0.a1);
  const $c6 = Game_Logic_highestPossibleScore($0.a3, ($a5+1n), $0.a1);
  const $cf = Prelude_Types_List_lengthTR(Game_Logic_safeCards($0.a3, $0.a1, $0.a5));
  const $d9 = Prelude_Types_List_lengthTR(Game_Logic_unsafeCards($0.a3, $0.a1, $0.a5));
  const $e3 = (Number($cf)/Number(($cf+$d9)));
  const $a0 = () => $ea => {
   const $eb = Main_setColoredValue('their-hand-counter', $a1, $0.a5, $ea);
   const $f2 = Main_setColoredValue('their-lowest-counter', $a7, $0.a5, $ea);
   const $f9 = Main_setColoredValue('their-highest-counter', $ae, $0.a5, $ea);
   const $100 = Main_setColoredValue('their-lowest-draw-counter', $bd, $0.a5, $ea);
   const $107 = Main_setColoredValue('their-highest-draw-counter', $c6, $0.a5, $ea);
   const $10e = Main_renderPerfect('their-perfect', 0, $b5, $ea);
   const $114 = Main_setStatValue(csegen_14()(), 'their-safe-counter', $cf)($ea);
   const $11d = Main_setStatValue(csegen_14()(), 'their-unsafe-counter', $d9)($ea);
   const $126 = Main_setStatValue(csegen_16()(), 'their-odds', (Prelude_Show_show_Show_Double((Number(100n)*$e3))+'%'))($ea);
   const $138 = Prelude_Types_List_lengthTR($0.a1);
   const $137 = () => $13c => {
    const $13d = Main_setStatValue(csegen_16()(), 'remaining-counter', ('Remaining Cards: '+Prelude_Show_show_Show_Nat($138)))($13c);
    return Main_setStatValue(csegen_14()(), 'unknown-counter', $0.a4)($13c);
   };
   const $136 = $137();
   return $136($ea);
  };
  const $9f = $a0();
  return $9f($61);
 };
 const $2a = $2b();
 return $2a($1);
}

/* Main.renderButton : GameState -> (Button, (Player, Card)) -> IO () */
function Main_renderButton($0, $1) {
 return $2 => Main_setCardState($1.a1, Main_getCardState($0, $1.a2.a1, $1.a2.a2), $2);
}

/* Main.registerUnknownButtonEventListener : IORef GameState -> Button -> Bool -> IO () */
function Main_registerUnknownButtonEventListener($0, $1, $2) {
 const $9 = $a => {
  const $b = ($0.value);
  let $11;
  switch($2) {
   case 1: {
    $11 = {h: 5 /* AddUnknown */};
    break;
   }
   case 0: {
    $11 = {h: 6 /* RemoveUnknown */};
    break;
   }
  }
  const $f = Game_Events_handleEvent($11, $b);
  const $14 = Main_renderGameState($f, $a);
  return ($0.value=$f);
 };
 return HTML_Dom_addEventListener(csegen_13()(), $1, 'click', $9);
}

/* Main.registerResetButtonListener : IORef GameState -> IO () */
function Main_registerResetButtonListener($0) {
 const $8 = $9 => {
  const $a = ($0.value);
  const $e = Game_Events_handleEvent({h: 7 /* Reset */}, $a);
  const $12 = Main_renderGameState($e, $9);
  return ($0.value=$e);
 };
 return HTML_Dom_addEventListener(csegen_13()(), Main_resetButton(), 'click', $8);
}

/* Main.registerGoalButtonEventListener : IORef GameState -> (Button, Goal) -> IO () */
function Main_registerGoalButtonEventListener($0, $1) {
 const $9 = $a => {
  const $b = ($0.value);
  const $f = {a1: $b.a1, a2: $b.a2, a3: $b.a3, a4: $b.a4, a5: $1.a2};
  const $16 = Main_renderGameState($f, $a);
  return ($0.value=$f);
 };
 return HTML_Dom_addEventListener(csegen_13()(), $1.a1, 'click', $9);
}

/* Main.registerCardButtonEventListener : IORef GameState -> (Button, (Player, Card)) -> IO () */
function Main_registerCardButtonEventListener($0, $1) {
 const $a = $b => {
  const $c = ($0.value);
  const $10 = Main_cardUpdateGameState($1.a1, $1.a2.a1, $1.a2.a2, $c);
  const $16 = Main_renderGameState($10, $b);
  return ($0.value=$10);
 };
 return HTML_Dom_addEventListener(csegen_13()(), $1.a1, 'click', $a);
}

/* Main.main : IO () */
function Main_main($0) {
 const $1 = Data_IORef_newIORef(csegen_13()(), Game_Types_NewGameState())($0);
 const $a = Prelude_Interfaces_sequence_(csegen_6()(), csegen_31(), Prelude_Types_List_mapAppend({h: 0}, $16 => Main_registerCardButtonEventListener($1, $16), Main_cardButtons()))($0);
 const $1d = Prelude_Interfaces_sequence_(csegen_6()(), csegen_31(), Prelude_Types_List_mapAppend({h: 0}, $29 => Main_registerGoalButtonEventListener($1, $29), Main_goalButtons()))($0);
 const $30 = Main_registerResetButtonListener($1)($0);
 const $35 = Main_registerUnknownButtonEventListener($1, 'increase-unknown', 1)($0);
 return Main_registerUnknownButtonEventListener($1, 'decrease-unknown', 0)($0);
}

/* Main.goalButtons : List (Button, Goal) */
const Main_goalButtons = __lazy(function () {
 return {a1: {a1: 'goal-button-17', a2: 0}, a2: {a1: {a1: 'goal-button-21', a2: 1}, a2: {a1: {a1: 'goal-button-24', a2: 2}, a2: {a1: {a1: 'goal-button-27', a2: 3}, a2: {h: 0}}}}};
});

/* Main.getGoalState : GameState -> Goal -> CardState */
function Main_getGoalState($0, $1) {
 switch(Game_Types_x3dx3d_Eq_Goal($0.a5, $1)) {
  case 1: return 0;
  case 0: return 1;
 }
}

/* Main.getCardState : GameState -> Player -> Card -> CardState */
function Main_getCardState($0, $1, $2) {
 let $a;
 switch(Main_x3dx3d_Eq_Player($1, 0)) {
  case 1: {
   $a = $0.a2;
   break;
  }
  case 0: {
   $a = $0.a3;
   break;
  }
 }
 const $7 = Game_Card_hasCard($2, $a);
 return Main_with__getCardState_2282($2, $1, $0, $7);
}

/* Main.cardUpdateGameState : Button -> Player -> Card -> (1 _ : GameState) -> GameState */
function Main_cardUpdateGameState($0, $1, $2, $3) {
 return Main_with__cardUpdateGameState_1766($3.a1, $2, Game_Card_hasCard($2, $3.a1), $3.a5, $3.a4, $3.a3, $3.a2, $1, $0);
}

/* Main.cardButtons : List (Button, (Player, Card)) */
const Main_cardButtons = __lazy(function () {
 return {a1: {a1: 'my-card-button-1', a2: {a1: 0, a2: 0}}, a2: {a1: {a1: 'my-card-button-2', a2: {a1: 0, a2: 1}}, a2: {a1: {a1: 'my-card-button-3', a2: {a1: 0, a2: 2}}, a2: {a1: {a1: 'my-card-button-4', a2: {a1: 0, a2: 3}}, a2: {a1: {a1: 'my-card-button-5', a2: {a1: 0, a2: 4}}, a2: {a1: {a1: 'my-card-button-6', a2: {a1: 0, a2: 5}}, a2: {a1: {a1: 'my-card-button-7', a2: {a1: 0, a2: 6}}, a2: {a1: {a1: 'my-card-button-8', a2: {a1: 0, a2: 7}}, a2: {a1: {a1: 'my-card-button-9', a2: {a1: 0, a2: 8}}, a2: {a1: {a1: 'my-card-button-10', a2: {a1: 0, a2: 9}}, a2: {a1: {a1: 'my-card-button-11', a2: {a1: 0, a2: 10}}, a2: {a1: {a1: 'their-card-button-1', a2: {a1: 1, a2: 0}}, a2: {a1: {a1: 'their-card-button-2', a2: {a1: 1, a2: 1}}, a2: {a1: {a1: 'their-card-button-3', a2: {a1: 1, a2: 2}}, a2: {a1: {a1: 'their-card-button-4', a2: {a1: 1, a2: 3}}, a2: {a1: {a1: 'their-card-button-5', a2: {a1: 1, a2: 4}}, a2: {a1: {a1: 'their-card-button-6', a2: {a1: 1, a2: 5}}, a2: {a1: {a1: 'their-card-button-7', a2: {a1: 1, a2: 6}}, a2: {a1: {a1: 'their-card-button-8', a2: {a1: 1, a2: 7}}, a2: {a1: {a1: 'their-card-button-9', a2: {a1: 1, a2: 8}}, a2: {a1: {a1: 'their-card-button-10', a2: {a1: 1, a2: 9}}, a2: {a1: {a1: 'their-card-button-11', a2: {a1: 1, a2: 10}}, a2: {h: 0}}}}}}}}}}}}}}}}}}}}}}};
});

/* HTML.Dom.toDomValue */
function HTML_Dom_toDomValue_DomValue_Nat($0) {
 return Prelude_Types_prim__integerToNat(_bigIntOfString($0));
}

/* HTML.Dom.fromDomValue */
function HTML_Dom_fromDomValue_DomValue_Nat($0) {
 return Prelude_Show_show_Show_Nat($0);
}

/* HTML.Dom.setInnerHTML : (HasIO io, DomValue innerHTML) =>
DomElement value innerHTML -> innerHTML -> io () */
function HTML_Dom_setInnerHTML($0, $1, $2) {
 const $3 = Builtin_fst($0);
 const $9 = $a => {
  const $e = Builtin_snd($0);
  const $d = $e.a2($2);
  return HTML_Dom_prim__setInnerHTML($1, $d, $a);
 };
 return $3.a2(undefined)($9);
}

/* HTML.Dom.removeClass : HasIO io => DomElement a b -> String -> io () */
function HTML_Dom_removeClass($0, $1, $2) {
 return $0.a2(undefined)($8 => HTML_Dom_prim__removeClass($1, $2, $8));
}

/* HTML.Dom.addEventListener : HasIO io => DomElement value innerHTML -> String -> IO () -> io () */
function HTML_Dom_addEventListener($0, $1, $2, $3) {
 return $0.a2(undefined)($9 => HTML_Dom_prim__addEventListener($1, $2, $3, $9));
}

/* HTML.Dom.addClass : HasIO io => DomElement a b -> String -> io () */
function HTML_Dom_addClass($0, $1, $2) {
 return $0.a2(undefined)($8 => HTML_Dom_prim__addClass($1, $2, $8));
}

/* Prelude.Uninhabited.void : (0 _ : Void) -> a */
function Prelude_Uninhabited_void$($0) {
 return _crashExp('Error: Executed \'void\'');
}

/* Prelude.Basics.flip : (a -> b -> c) -> b -> a -> c */
function Prelude_Basics_flip($0, $1, $2) {
 return $0($2)($1);
}

/* Builtin.snd : (a, b) -> b */
function Builtin_snd($0) {
 return $0.a2;
}

/* Builtin.fst : (a, b) -> a */
function Builtin_fst($0) {
 return $0.a1;
}

/* Prelude.Types.pure */
function Prelude_Types_pure_Applicative_List($0) {
 return {a1: $0, a2: {h: 0}};
}

/* Prelude.Types.null */
function Prelude_Types_null_Foldable_List($0) {
 switch($0.h) {
  case 0: /* nil */ return 1;
  case undefined: /* cons */ return 0;
 }
}

/* Prelude.Types.min */
function Prelude_Types_min_Ord_Nat($0, $1) {
 switch(Prelude_Types_x3c_Ord_Nat($0, $1)) {
  case 1: return $0;
  case 0: return $1;
 }
}

/* Prelude.Types.max */
function Prelude_Types_max_Ord_Nat($0, $1) {
 switch(Prelude_Types_x3e_Ord_Nat($0, $1)) {
  case 1: return $0;
  case 0: return $1;
 }
}

/* Prelude.Types.foldr */
function Prelude_Types_foldr_Foldable_List($0, $1, $2) {
 switch($2.h) {
  case 0: /* nil */ return $1;
  case undefined: /* cons */ return $0($2.a1)(Prelude_Types_foldr_Foldable_List($0, $1, $2.a2));
 }
}

/* Prelude.Types.foldlM */
function Prelude_Types_foldlM_Foldable_List($0, $1, $2, $3) {
 return Prelude_Types_foldl_Foldable_List(ma => b => $0.a2(undefined)(undefined)(ma)($f => Prelude_Basics_flip($1, b, $f)), $0.a1.a2(undefined)($2), $3);
}

/* Prelude.Types.foldMap */
function Prelude_Types_foldMap_Foldable_List($0, $1, $2) {
 return Prelude_Types_foldl_Foldable_List(acc => elem => $0.a1(acc)($1(elem)), $0.a2, $2);
}

/* Prelude.Types.> */
function Prelude_Types_x3e_Ord_Nat($0, $1) {
 return Prelude_EqOrd_x3dx3d_Eq_Ordering(Prelude_EqOrd_compare_Ord_Integer($0, $1), 2);
}

/* Prelude.Types.>= */
function Prelude_Types_x3ex3d_Ord_Nat($0, $1) {
 return Prelude_EqOrd_x2fx3d_Eq_Ordering(Prelude_EqOrd_compare_Ord_Integer($0, $1), 0);
}

/* Prelude.Types.< */
function Prelude_Types_x3c_Ord_Nat($0, $1) {
 return Prelude_EqOrd_x3dx3d_Eq_Ordering(Prelude_EqOrd_compare_Ord_Integer($0, $1), 0);
}

/* Prelude.Types.<= */
function Prelude_Types_x3cx3d_Ord_Nat($0, $1) {
 return Prelude_EqOrd_x2fx3d_Eq_Ordering(Prelude_EqOrd_compare_Ord_Integer($0, $1), 2);
}

/* Prelude.Types.<*> */
function Prelude_Types_x3cx2ax3e_Applicative_List($0, $1) {
 return Prelude_Types_listBind($0, f => Prelude_Types_List_mapAppend({h: 0}, f, $1));
}

/* Prelude.Types./= */
function Prelude_Types_x2fx3d_Eq_Nat($0, $1) {
 switch((($0===$1)?1:0)) {
  case 1: return 0;
  case 0: return 1;
 }
}

/* Prelude.Types.List.tailRecAppend : List a -> List a -> List a */
function Prelude_Types_List_tailRecAppend($0, $1) {
 return Prelude_Types_List_reverseOnto($1, Prelude_Types_List_reverse($0));
}

/* Prelude.Types.List.reverse : List a -> List a */
function Prelude_Types_List_reverse($0) {
 return Prelude_Types_List_reverseOnto({h: 0}, $0);
}

/* Prelude.Types.prim__integerToNat : Integer -> Nat */
function Prelude_Types_prim__integerToNat($0) {
 switch(((0n<=$0)?1:0)) {
  case 0: return 0n;
  default: return $0;
 }
}

/* Prelude.Types.listBind : List a -> (a -> List b) -> List b */
function Prelude_Types_listBind($0, $1) {
 return Prelude_Types_listBindOnto($1, {h: 0}, $0);
}

/* Prelude.Types.List.lengthTR : List a -> Nat */
function Prelude_Types_List_lengthTR($0) {
 return Prelude_Types_List_lengthPlus(0n, $0);
}

/* Prelude.EqOrd.compare */
function Prelude_EqOrd_compare_Ord_Integer($0, $1) {
 switch(Prelude_EqOrd_x3c_Ord_Integer($0, $1)) {
  case 1: return 0;
  case 0: {
   switch(Prelude_EqOrd_x3dx3d_Eq_Integer($0, $1)) {
    case 1: return 1;
    case 0: return 2;
   }
  }
 }
}

/* Prelude.EqOrd.== */
function Prelude_EqOrd_x3dx3d_Eq_Ordering($0, $1) {
 switch($0) {
  case 0: {
   switch($1) {
    case 0: return 1;
    default: return 0;
   }
  }
  case 1: {
   switch($1) {
    case 1: return 1;
    default: return 0;
   }
  }
  case 2: {
   switch($1) {
    case 2: return 1;
    default: return 0;
   }
  }
  default: return 0;
 }
}

/* Prelude.EqOrd.== */
function Prelude_EqOrd_x3dx3d_Eq_Integer($0, $1) {
 switch((($0===$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.== */
function Prelude_EqOrd_x3dx3d_Eq_Char($0, $1) {
 switch((($0===$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd.< */
function Prelude_EqOrd_x3c_Ord_Integer($0, $1) {
 switch((($0<$1)?1:0)) {
  case 0: return 0;
  default: return 1;
 }
}

/* Prelude.EqOrd./= */
function Prelude_EqOrd_x2fx3d_Eq_Ordering($0, $1) {
 switch(Prelude_EqOrd_x3dx3d_Eq_Ordering($0, $1)) {
  case 1: return 0;
  case 0: return 1;
 }
}

/* Prelude.EqOrd.compareInteger : Integer -> Integer -> Ordering */
function Prelude_EqOrd_compareInteger($0, $1) {
 return Prelude_EqOrd_compare_Ord_Integer($0, $1);
}

/* Prelude.Interfaces.Num.Monoid.neutral */
function Prelude_Interfaces_Num_Monoid_neutral_Monoid_Additivex24a($0) {
 return $0.a3(0n);
}

/* Prelude.Interfaces.Num.Semigroup.<+> */
function Prelude_Interfaces_Num_Semigroup_x3cx2bx3e_Semigroup_Additivex24a($0, $1, $2) {
 return $0.a1($1)($2);
}

/* Prelude.Interfaces.when : Applicative f => Bool -> Lazy (f ()) -> f () */
function Prelude_Interfaces_when($0, $1, $2) {
 switch($1) {
  case 1: return $2();
  case 0: return $0.a2(undefined)(undefined);
 }
}

/* Prelude.Interfaces.sum : Num a => Foldable t => t a -> a */
function Prelude_Interfaces_sum($0, $1, $2) {
 return $1.a6(undefined)(undefined)({a1: $d => $e => Prelude_Interfaces_Num_Semigroup_x3cx2bx3e_Semigroup_Additivex24a($0, $d, $e), a2: Prelude_Interfaces_Num_Monoid_neutral_Monoid_Additivex24a($0)})($17 => $17)($2);
}

/* Prelude.Interfaces.sequence_ : Applicative f => Foldable t => t (f a) -> f () */
function Prelude_Interfaces_sequence_($0, $1, $2) {
 return $1.a1(undefined)(undefined)($c => $d => Prelude_Interfaces_x2ax3e($0, $c, $d))($0.a2(undefined)(undefined))($2);
}

/* Prelude.Interfaces.guard : Alternative f => Bool -> f () */
function Prelude_Interfaces_guard($0, $1) {
 switch($1) {
  case 1: return $0.a1.a2(undefined)(undefined);
  case 0: return $0.a2(undefined);
 }
}

/* Prelude.Interfaces.(*>) : Applicative f => f a -> f b -> f b */
function Prelude_Interfaces_x2ax3e($0, $1, $2) {
 const $d = $0.a1;
 const $c = $f => $10 => $d(undefined)(undefined)($f)($10);
 const $b = $c($1a => $1b => $1b);
 const $a = $b($1);
 const $4 = $0.a3(undefined)(undefined)($a);
 return $4($2);
}

/* Prelude.Show.show */
function Prelude_Show_show_Show_Nat($0) {
 return Prelude_Show_show_Show_Integer($0);
}

/* Prelude.Show.show */
function Prelude_Show_show_Show_Integer($0) {
 return Prelude_Show_showPrec_Show_Integer({h: 0 /* Open */}, $0);
}

/* Prelude.Show.show */
function Prelude_Show_show_Show_Double($0) {
 return Prelude_Show_showPrec_Show_Double({h: 0 /* Open */}, $0);
}

/* Prelude.Show.showPrec */
function Prelude_Show_showPrec_Show_Integer($0, $1) {
 return Prelude_Show_primNumShow($4 => (''+$4), $0, $1);
}

/* Prelude.Show.showPrec */
function Prelude_Show_showPrec_Show_Double($0, $1) {
 return Prelude_Show_primNumShow($4 => (''+$4), $0, $1);
}

/* Prelude.Show.compare */
function Prelude_Show_compare_Ord_Prec($0, $1) {
 switch($0.h) {
  case 4: /* User */ {
   switch($1.h) {
    case 4: /* User */ return Prelude_EqOrd_compare_Ord_Integer($0.a1, $1.a1);
    default: return Prelude_EqOrd_compare_Ord_Integer(Prelude_Show_precCon($0), Prelude_Show_precCon($1));
   }
  }
  default: return Prelude_EqOrd_compare_Ord_Integer(Prelude_Show_precCon($0), Prelude_Show_precCon($1));
 }
}

/* Prelude.Show.>= */
function Prelude_Show_x3ex3d_Ord_Prec($0, $1) {
 return Prelude_EqOrd_x2fx3d_Eq_Ordering(Prelude_Show_compare_Ord_Prec($0, $1), 0);
}

/* Prelude.Show.showParens : Bool -> String -> String */
function Prelude_Show_showParens($0, $1) {
 switch($0) {
  case 0: return $1;
  case 1: return ('('+($1+')'));
 }
}

/* Prelude.Show.primNumShow : (a -> String) -> Prec -> a -> String */
function Prelude_Show_primNumShow($0, $1, $2) {
 const $3 = $0($2);
 let $7;
 switch(Prelude_Show_x3ex3d_Ord_Prec($1, {h: 5 /* PrefixMinus */})) {
  case 1: {
   $7 = Prelude_Show_firstCharIs($e => Prelude_EqOrd_x3dx3d_Eq_Char($e, '-'), $3);
   break;
  }
  case 0: {
   $7 = 0;
   break;
  }
 }
 return Prelude_Show_showParens($7, $3);
}

/* Prelude.Show.precCon : Prec -> Integer */
function Prelude_Show_precCon($0) {
 switch($0.h) {
  case 0: /* Open */ return 0n;
  case 1: /* Equal */ return 1n;
  case 2: /* Dollar */ return 2n;
  case 3: /* Backtick */ return 3n;
  case 4: /* User */ return 4n;
  case 5: /* PrefixMinus */ return 5n;
  case 6: /* App */ return 6n;
 }
}

/* Prelude.Show.firstCharIs : (Char -> Bool) -> String -> Bool */
function Prelude_Show_firstCharIs($0, $1) {
 switch($1) {
  case '': return 0;
  default: return $0(($1.charAt(0)));
 }
}

/* Prelude.IO.map */
function Prelude_IO_map_Functor_IO($0, $1, $2) {
 const $3 = $1($2);
 return $0($3);
}

/* PrimIO.unsafePerformIO : IO a -> a */
function PrimIO_unsafePerformIO($0) {
 const $2 = w => {
  const $3 = $0(w);
  return $3;
 };
 return PrimIO_unsafeCreateWorld($2);
}

/* PrimIO.unsafeCreateWorld : (1 _ : ((1 _ : %World) -> a)) -> a */
function PrimIO_unsafeCreateWorld($0) {
 return $0(_idrisworld);
}

/* Game.Types.== */
function Game_Types_x3dx3d_Eq_Goal($0, $1) {
 switch($0) {
  case 0: {
   switch($1) {
    case 0: return 1;
    default: return 0;
   }
  }
  case 1: {
   switch($1) {
    case 1: return 1;
    default: return 0;
   }
  }
  case 2: {
   switch($1) {
    case 2: return 1;
    default: return 0;
   }
  }
  case 3: {
   switch($1) {
    case 3: return 1;
    default: return 0;
   }
  }
  default: return 0;
 }
}

/* Game.Types.goalToNat : Goal -> Nat */
function Game_Types_goalToNat($0) {
 switch($0) {
  case 0: return 17n;
  case 1: return 21n;
  case 2: return 24n;
  case 3: return 27n;
 }
}

/* Game.Types.NewGameState : GameState */
const Game_Types_NewGameState = __lazy(function () {
 return {a1: Game_Card_allCards(), a2: {h: 0}, a3: {h: 0}, a4: 1n, a5: 1};
});

/* Game.Card.with block in with block in hasCard */
function Game_Card_with__withx20blockx20inx20hasCard_4907($0, $1, $2, $3, $4) {
 switch($2.h) {
  case 0: /* Yes */ return {h: 0 /* Yes */, a1: ($2.a1+1n)};
  case 1: /* No */ return {h: 1 /* No */, a1: $a => Game_Card_hasCard_rhs_2_rhs2_1_rhs1_1($2.a1, $4, $a)};
 }
}

/* Game.Card.with block in hasCard */
function Game_Card_with__hasCard_4885($0, $1, $2, $3) {
 switch($2.h) {
  case 0: /* Yes */ return {h: 0 /* Yes */, a1: 0n};
  case 1: /* No */ return Game_Card_with__withx20blockx20inx20hasCard_4907($1, $3, Game_Card_hasCard($1, $3), $0, $2.a1);
 }
}

/* Game.Card.uninhabited */
function Game_Card_uninhabited_Uninhabited_x28x28HasCardx20x24cx29x20Nilx29($0) {
 _crashExp('No clauses');
}

/* Game.Card.decEq */
function Game_Card_decEq_DecEq_Card($0, $1) {
 switch($0) {
  case 0: {
   switch($1) {
    case 0: return {h: 0 /* Yes */, a1: undefined};
    case 1: {
     const $5 = $6 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $5};
    }
    case 2: {
     const $7 = $8 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $7};
    }
    case 3: {
     const $9 = $a => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $9};
    }
    case 4: {
     const $b = $c => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $b};
    }
    case 5: {
     const $d = $e => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $d};
    }
    case 6: {
     const $f = $10 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $f};
    }
    case 7: {
     const $11 = $12 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $11};
    }
    case 8: {
     const $13 = $14 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $13};
    }
    case 9: {
     const $15 = $16 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $15};
    }
    case 10: {
     const $17 = $18 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $17};
    }
   }
  }
  case 1: {
   switch($1) {
    case 0: {
     const $1a = $1b => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $1a};
    }
    case 1: return {h: 0 /* Yes */, a1: undefined};
    case 2: {
     const $1d = $1e => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $1d};
    }
    case 3: {
     const $1f = $20 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $1f};
    }
    case 4: {
     const $21 = $22 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $21};
    }
    case 5: {
     const $23 = $24 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $23};
    }
    case 6: {
     const $25 = $26 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $25};
    }
    case 7: {
     const $27 = $28 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $27};
    }
    case 8: {
     const $29 = $2a => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $29};
    }
    case 9: {
     const $2b = $2c => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $2b};
    }
    case 10: {
     const $2d = $2e => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $2d};
    }
   }
  }
  case 2: {
   switch($1) {
    case 0: {
     const $30 = $31 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $30};
    }
    case 1: {
     const $32 = $33 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $32};
    }
    case 2: return {h: 0 /* Yes */, a1: undefined};
    case 3: {
     const $35 = $36 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $35};
    }
    case 4: {
     const $37 = $38 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $37};
    }
    case 5: {
     const $39 = $3a => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $39};
    }
    case 6: {
     const $3b = $3c => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $3b};
    }
    case 7: {
     const $3d = $3e => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $3d};
    }
    case 8: {
     const $3f = $40 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $3f};
    }
    case 9: {
     const $41 = $42 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $41};
    }
    case 10: {
     const $43 = $44 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $43};
    }
   }
  }
  case 3: {
   switch($1) {
    case 0: {
     const $46 = $47 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $46};
    }
    case 1: {
     const $48 = $49 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $48};
    }
    case 2: {
     const $4a = $4b => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $4a};
    }
    case 3: return {h: 0 /* Yes */, a1: undefined};
    case 4: {
     const $4d = $4e => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $4d};
    }
    case 5: {
     const $4f = $50 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $4f};
    }
    case 6: {
     const $51 = $52 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $51};
    }
    case 7: {
     const $53 = $54 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $53};
    }
    case 8: {
     const $55 = $56 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $55};
    }
    case 9: {
     const $57 = $58 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $57};
    }
    case 10: {
     const $59 = $5a => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $59};
    }
   }
  }
  case 4: {
   switch($1) {
    case 0: {
     const $5c = $5d => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $5c};
    }
    case 1: {
     const $5e = $5f => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $5e};
    }
    case 2: {
     const $60 = $61 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $60};
    }
    case 3: {
     const $62 = $63 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $62};
    }
    case 4: return {h: 0 /* Yes */, a1: undefined};
    case 5: {
     const $65 = $66 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $65};
    }
    case 6: {
     const $67 = $68 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $67};
    }
    case 7: {
     const $69 = $6a => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $69};
    }
    case 8: {
     const $6b = $6c => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $6b};
    }
    case 9: {
     const $6d = $6e => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $6d};
    }
    case 10: {
     const $6f = $70 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $6f};
    }
   }
  }
  case 5: {
   switch($1) {
    case 0: {
     const $72 = $73 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $72};
    }
    case 1: {
     const $74 = $75 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $74};
    }
    case 2: {
     const $76 = $77 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $76};
    }
    case 3: {
     const $78 = $79 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $78};
    }
    case 4: {
     const $7a = $7b => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $7a};
    }
    case 5: return {h: 0 /* Yes */, a1: undefined};
    case 6: {
     const $7d = $7e => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $7d};
    }
    case 7: {
     const $7f = $80 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $7f};
    }
    case 8: {
     const $81 = $82 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $81};
    }
    case 9: {
     const $83 = $84 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $83};
    }
    case 10: {
     const $85 = $86 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $85};
    }
   }
  }
  case 6: {
   switch($1) {
    case 0: {
     const $88 = $89 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $88};
    }
    case 1: {
     const $8a = $8b => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $8a};
    }
    case 2: {
     const $8c = $8d => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $8c};
    }
    case 3: {
     const $8e = $8f => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $8e};
    }
    case 4: {
     const $90 = $91 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $90};
    }
    case 5: {
     const $92 = $93 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $92};
    }
    case 6: return {h: 0 /* Yes */, a1: undefined};
    case 7: {
     const $95 = $96 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $95};
    }
    case 8: {
     const $97 = $98 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $97};
    }
    case 9: {
     const $99 = $9a => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $99};
    }
    case 10: {
     const $9b = $9c => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $9b};
    }
   }
  }
  case 7: {
   switch($1) {
    case 0: {
     const $9e = $9f => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $9e};
    }
    case 1: {
     const $a0 = $a1 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $a0};
    }
    case 2: {
     const $a2 = $a3 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $a2};
    }
    case 3: {
     const $a4 = $a5 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $a4};
    }
    case 4: {
     const $a6 = $a7 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $a6};
    }
    case 5: {
     const $a8 = $a9 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $a8};
    }
    case 6: {
     const $aa = $ab => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $aa};
    }
    case 7: return {h: 0 /* Yes */, a1: undefined};
    case 8: {
     const $ad = $ae => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $ad};
    }
    case 9: {
     const $af = $b0 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $af};
    }
    case 10: {
     const $b1 = $b2 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $b1};
    }
   }
  }
  case 8: {
   switch($1) {
    case 0: {
     const $b4 = $b5 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $b4};
    }
    case 1: {
     const $b6 = $b7 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $b6};
    }
    case 2: {
     const $b8 = $b9 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $b8};
    }
    case 3: {
     const $ba = $bb => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $ba};
    }
    case 4: {
     const $bc = $bd => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $bc};
    }
    case 5: {
     const $be = $bf => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $be};
    }
    case 6: {
     const $c0 = $c1 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $c0};
    }
    case 7: {
     const $c2 = $c3 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $c2};
    }
    case 8: return {h: 0 /* Yes */, a1: undefined};
    case 9: {
     const $c5 = $c6 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $c5};
    }
    case 10: {
     const $c7 = $c8 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $c7};
    }
   }
  }
  case 9: {
   switch($1) {
    case 0: {
     const $ca = $cb => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $ca};
    }
    case 1: {
     const $cc = $cd => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $cc};
    }
    case 2: {
     const $ce = $cf => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $ce};
    }
    case 3: {
     const $d0 = $d1 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $d0};
    }
    case 4: {
     const $d2 = $d3 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $d2};
    }
    case 5: {
     const $d4 = $d5 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $d4};
    }
    case 6: {
     const $d6 = $d7 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $d6};
    }
    case 7: {
     const $d8 = $d9 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $d8};
    }
    case 8: {
     const $da = $db => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $da};
    }
    case 9: return {h: 0 /* Yes */, a1: undefined};
    case 10: {
     const $dd = $de => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $dd};
    }
   }
  }
  case 10: {
   switch($1) {
    case 0: {
     const $e0 = $e1 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $e0};
    }
    case 1: {
     const $e2 = $e3 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $e2};
    }
    case 2: {
     const $e4 = $e5 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $e4};
    }
    case 3: {
     const $e6 = $e7 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $e6};
    }
    case 4: {
     const $e8 = $e9 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $e8};
    }
    case 5: {
     const $ea = $eb => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $ea};
    }
    case 6: {
     const $ec = $ed => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $ec};
    }
    case 7: {
     const $ee = $ef => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $ee};
    }
    case 8: {
     const $f0 = $f1 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $f0};
    }
    case 9: {
     const $f2 = $f3 => {
      _crashExp('No clauses');
     };
     return {h: 1 /* No */, a1: $f2};
    }
    case 10: return {h: 0 /* Yes */, a1: undefined};
   }
  }
 }
}

/* Game.Card.removeCard : (c : Card) -> (xs : List Card) -> HasCard c xs => List Card */
function Game_Card_removeCard($0, $1, $2) {
 switch($2) {
  case 0n: return $1.a2;
  default: {
   const $5 = ($2-1n);
   return {a1: $1.a1, a2: Game_Card_removeCard($0, $1.a2, $5)};
  }
 }
}

/* Game.Card.hasCard_rhs_2_rhs2_1_rhs1_1 : (HasCard c xs -> Void) -> (c = x -> Void) -> HasCard c (x :: xs) -> Void */
function Game_Card_hasCard_rhs_2_rhs2_1_rhs1_1($0, $1, $2) {
 switch($2) {
  case 0n: return Prelude_Uninhabited_void$(undefined);
  default: return Prelude_Uninhabited_void$(undefined);
 }
}

/* Game.Card.hasCard : (c : Card) -> (xs : List Card) -> Dec (HasCard c xs) */
function Game_Card_hasCard($0, $1) {
 switch($1.h) {
  case 0: /* nil */ return {h: 1 /* No */, a1: $4 => Game_Card_uninhabited_Uninhabited_x28x28HasCardx20x24cx29x20Nilx29($4)};
  case undefined: /* cons */ return Game_Card_with__hasCard_4885($1.a1, $0, Game_Card_decEq_DecEq_Card($0, $1.a1), $1.a2);
 }
}

/* Game.Card.fromNatMaybe : Nat -> Maybe Card */
function Game_Card_fromNatMaybe($0) {
 switch($0) {
  case 0n: return {h: 0};
  default: {
   const $2 = ($0-1n);
   switch($2) {
    case 0n: return {a1: 0};
    default: {
     const $7 = ($2-1n);
     switch($7) {
      case 0n: return {a1: 1};
      default: {
       const $c = ($7-1n);
       switch($c) {
        case 0n: return {a1: 2};
        default: {
         const $11 = ($c-1n);
         switch($11) {
          case 0n: return {a1: 3};
          default: {
           const $16 = ($11-1n);
           switch($16) {
            case 0n: return {a1: 4};
            default: {
             const $1b = ($16-1n);
             switch($1b) {
              case 0n: return {a1: 5};
              default: {
               const $20 = ($1b-1n);
               switch($20) {
                case 0n: return {a1: 6};
                default: {
                 const $25 = ($20-1n);
                 switch($25) {
                  case 0n: return {a1: 7};
                  default: {
                   const $2a = ($25-1n);
                   switch($2a) {
                    case 0n: return {a1: 8};
                    default: {
                     const $2f = ($2a-1n);
                     switch($2f) {
                      case 0n: return {a1: 9};
                      default: {
                       const $34 = ($2f-1n);
                       switch($34) {
                        case 0n: return {a1: 10};
                        default: return {h: 0};
                       }
                      }
                     }
                    }
                   }
                  }
                 }
                }
               }
              }
             }
            }
           }
          }
         }
        }
       }
      }
     }
    }
   }
  }
 }
}

/* Game.Card.cardToNat : Card -> Nat */
function Game_Card_cardToNat($0) {
 switch($0) {
  case 0: return 1n;
  case 1: return 2n;
  case 2: return 3n;
  case 3: return 4n;
  case 4: return 5n;
  case 5: return 6n;
  case 6: return 7n;
  case 7: return 8n;
  case 8: return 9n;
  case 9: return 10n;
  case 10: return 11n;
 }
}

/* Game.Card.allCards : List Card */
const Game_Card_allCards = __lazy(function () {
 return {a1: 0, a2: {a1: 1, a2: {a1: 2, a2: {a1: 3, a2: {a1: 4, a2: {a1: 5, a2: {a1: 6, a2: {a1: 7, a2: {a1: 8, a2: {a1: 9, a2: {a1: 10, a2: {h: 0}}}}}}}}}}}};
});

/* Data.List.7827:8305:split */
function Data_List_n__7827_8305_split($0, $1, $2) {
 return Data_List_n__7827_8306_splitRec($0, $1, $2, $2, $9 => $9);
}

/* Data.List.take : Nat -> List a -> List a */
function Data_List_take($0, $1) {
 switch($0) {
  case 0n: return {h: 0};
  default: {
   const $3 = ($0-1n);
   switch($1.h) {
    case undefined: /* cons */ return {a1: $1.a1, a2: Data_List_take($3, $1.a2)};
    default: return {h: 0};
   }
  }
 }
}

/* Data.List.sortBy : (a -> a -> Ordering) -> List a -> List a */
function Data_List_sortBy($0, $1) {
 switch($1.h) {
  case 0: /* nil */ return {h: 0};
  case undefined: /* cons */ {
   switch($1.a2.h) {
    case 0: /* nil */ return {a1: $1.a1, a2: {h: 0}};
    default: {
     const $6 = Data_List_n__7827_8305_split($1, $0, $1);
     return Data_List_mergeBy($0, Data_List_sortBy($0, $6.a1), Data_List_sortBy($0, $6.a2));
    }
   }
  }
  default: {
   const $15 = Data_List_n__7827_8305_split($1, $0, $1);
   return Data_List_mergeBy($0, Data_List_sortBy($0, $15.a1), Data_List_sortBy($0, $15.a2));
  }
 }
}

/* Data.List.sort : Ord a => List a -> List a */
function Data_List_sort($0, $1) {
 return Data_List_sortBy($4 => $5 => $0.a2($4)($5), $1);
}

/* Data.List.mergeBy : (a -> a -> Ordering) -> List a -> List a -> List a */
function Data_List_mergeBy($0, $1, $2) {
 switch($1.h) {
  case 0: /* nil */ return $2;
  default: {
   switch($2.h) {
    case 0: /* nil */ return $1;
    default: {
     switch($0($1.a1)($2.a1)) {
      case 0: return {a1: $1.a1, a2: Data_List_mergeBy($0, $1.a2, {a1: $2.a1, a2: $2.a2})};
      default: return {a1: $2.a1, a2: Data_List_mergeBy($0, {a1: $1.a1, a2: $1.a2}, $2.a2)};
     }
    }
   }
  }
 }
}

/* Game.Logic.with block in with block in perfectCard */
function Game_Logic_with__withx20blockx20inx20perfectCard_5410($0, $1, $2, $3, $4) {
 switch($2.h) {
  case 0: /* Yes */ return {a1: {a1: $0, a2: 1}};
  case 1: /* No */ return {a1: {a1: $0, a2: 0}};
 }
}

/* Game.Logic.with block in perfectCard */
function Game_Logic_with__perfectCard_5403($0, $1, $2, $3) {
 switch($2.h) {
  case 0: /* nothing */ return {h: 0};
  case undefined: /* just */ return Game_Logic_with__withx20blockx20inx20perfectCard_5410($2.a1, $3, Game_Card_hasCard($2.a1, $3), $1, $0);
 }
}

/* Game.Logic.unsafeCards : List Card -> List Card -> Goal -> List Card */
function Game_Logic_unsafeCards($0, $1, $2) {
 return Prelude_Types_listBind($1, c => Prelude_Types_listBind(Prelude_Interfaces_guard(csegen_104(), Prelude_Types_x3e_Ord_Nat((Game_Logic_getHand($0)+Game_Card_cardToNat(c)), Game_Types_goalToNat($2))), $18 => Prelude_Types_pure_Applicative_List(c)));
}

/* Game.Logic.safeCards : List Card -> List Card -> Goal -> List Card */
function Game_Logic_safeCards($0, $1, $2) {
 return Prelude_Types_listBind($1, c => Prelude_Types_listBind(Prelude_Interfaces_guard(csegen_104(), Prelude_Types_x3cx3d_Ord_Nat((Game_Logic_getHand($0)+Game_Card_cardToNat(c)), Game_Types_goalToNat($2))), $18 => Prelude_Types_pure_Applicative_List(c)));
}

/* Game.Logic.perfectCard : List Card -> List Card -> Goal -> Maybe (Card, Bool) */
function Game_Logic_perfectCard($0, $1, $2) {
 return Game_Logic_with__perfectCard_5403($2, $0, Game_Card_fromNatMaybe(Prelude_Types_prim__integerToNat((Game_Types_goalToNat($2)-Game_Logic_getHand($0)))), $1);
}

/* Game.Logic.nLowest : Ord a => Nat -> List a -> List a */
function Game_Logic_nLowest($0, $1, $2) {
 return Data_List_take($1, Data_List_sort($0, $2));
}

/* Game.Logic.nHighest : Ord a => Nat -> List a -> List a */
function Game_Logic_nHighest($0, $1, $2) {
 return Data_List_take($1, Prelude_Types_List_reverse(Data_List_sort($0, $2)));
}

/* Game.Logic.lowestPossibleScore : List Card -> Nat -> List Card -> Nat */
function Game_Logic_lowestPossibleScore($0, $1, $2) {
 return (Game_Logic_getHand($0)+Prelude_Interfaces_sum(csegen_107(), csegen_31(), Game_Logic_nLowest(csegen_118(), $1, Prelude_Types_List_mapAppend({h: 0}, $15 => Game_Card_cardToNat($15), $2))));
}

/* Game.Logic.highestPossibleScore : List Card -> Nat -> List Card -> Nat */
function Game_Logic_highestPossibleScore($0, $1, $2) {
 return (Game_Logic_getHand($0)+Prelude_Interfaces_sum(csegen_107(), csegen_31(), Game_Logic_nHighest(csegen_118(), $1, Prelude_Types_List_mapAppend({h: 0}, $15 => Game_Card_cardToNat($15), $2))));
}

/* Game.Logic.getHand : List Card -> Nat */
function Game_Logic_getHand($0) {
 return Prelude_Interfaces_sum(csegen_107(), csegen_31(), Prelude_Types_List_mapAppend({h: 0}, $a => Game_Card_cardToNat($a), $0));
}

/* Game.Events.with block in handleEvent */
function Game_Events_with__handleEvent_5227($0, $1, $2, $3, $4, $5, $6) {
 switch($2.h) {
  case 0: /* Yes */ return {a1: {a1: $0, a2: $6}, a2: $5, a3: Game_Card_removeCard($0, $1, $2.a1), a4: $4, a5: $3};
  case 1: /* No */ return {a1: $6, a2: $5, a3: $1, a4: $4, a5: $3};
 }
}

/* Game.Events.with block in handleEvent */
function Game_Events_with__handleEvent_5214($0, $1, $2, $3, $4, $5, $6) {
 switch($2.h) {
  case 0: /* Yes */ return {a1: Game_Card_removeCard($0, $1, $2.a1), a2: $6, a3: {a1: $0, a2: $5}, a4: $4, a5: $3};
  case 1: /* No */ return {a1: $1, a2: $6, a3: $5, a4: $4, a5: $3};
 }
}

/* Game.Events.with block in handleEvent */
function Game_Events_with__handleEvent_5201($0, $1, $2, $3, $4, $5, $6) {
 switch($2.h) {
  case 0: /* Yes */ return {a1: {a1: $0, a2: $6}, a2: Game_Card_removeCard($0, $1, $2.a1), a3: $5, a4: $4, a5: $3};
  case 1: /* No */ return {a1: $6, a2: $1, a3: $5, a4: $4, a5: $3};
 }
}

/* Game.Events.with block in handleEvent */
function Game_Events_with__handleEvent_5188($0, $1, $2, $3, $4, $5, $6) {
 switch($2.h) {
  case 0: /* Yes */ return {a1: Game_Card_removeCard($0, $1, $2.a1), a2: {a1: $0, a2: $6}, a3: $5, a4: $4, a5: $3};
  case 1: /* No */ return {a1: $1, a2: $6, a3: $5, a4: $4, a5: $3};
 }
}

/* Game.Events.handleEvent : Event -> (1 _ : GameState) -> GameState */
function Game_Events_handleEvent($0, $1) {
 switch($0.h) {
  case 0: /* IDraw */ return Game_Events_with__handleEvent_5188($0.a1, $1.a1, Game_Card_hasCard($0.a1, $1.a1), $1.a5, $1.a4, $1.a3, $1.a2);
  case 1: /* IRemove */ return Game_Events_with__handleEvent_5201($0.a1, $1.a2, Game_Card_hasCard($0.a1, $1.a2), $1.a5, $1.a4, $1.a3, $1.a1);
  case 2: /* TheyDraw */ return Game_Events_with__handleEvent_5214($0.a1, $1.a1, Game_Card_hasCard($0.a1, $1.a1), $1.a5, $1.a4, $1.a3, $1.a2);
  case 3: /* TheyRemove */ return Game_Events_with__handleEvent_5227($0.a1, $1.a3, Game_Card_hasCard($0.a1, $1.a3), $1.a5, $1.a4, $1.a2, $1.a1);
  case 4: /* NewGoal */ return {a1: $1.a1, a2: $1.a2, a3: $1.a3, a4: $1.a4, a5: $0.a1};
  case 5: /* AddUnknown */ return {a1: $1.a1, a2: $1.a2, a3: $1.a3, a4: ($1.a4+1n), a5: $1.a5};
  case 6: /* RemoveUnknown */ return {a1: $1.a1, a2: $1.a2, a3: $1.a3, a4: Prelude_Types_prim__integerToNat(($1.a4-1n)), a5: $1.a5};
  case 7: /* Reset */ return Game_Types_NewGameState();
 }
}

/* Data.IORef.newIORef : HasIO io => a -> io (IORef a) */
function Data_IORef_newIORef($0, $1) {
 return $0.a1.a2(undefined)(undefined)($0.a2(undefined)($10 => ({value:$1})))(m => $0.a1.a1.a2(undefined)(m));
}


try{__mainExpression_0()}catch(e){if(e instanceof IdrisError){console.log('ERROR: ' + e.message)}else{throw e} }
