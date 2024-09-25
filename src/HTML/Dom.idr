module HTML.Dom

%default total

||| Idris representation of a DOM element, parameterized by the type of the value and innerHTML
public export 
record DomElement (value : Type) (innerHTML : Type) where 
    constructor MkDomElement
    elemID    : String

||| Interface to allow for ad-hoc polymorphism of DOM values
public export
interface DomValue a where 
    toDomValue   : String -> a 
    fromDomValue : a -> String

export 
DomValue String where 
    toDomValue   = id 
    fromDomValue = id

export
DomValue Double where 
    toDomValue   = cast
    fromDomValue = show

export 
DomValue Nat where 
    toDomValue   = cast 
    fromDomValue = show

%foreign "javascript:lambda:name=>document.getElementById(name).value"
prim__getValue : String -> PrimIO String

export
-- Proof of equivalence via referential transparency
||| Get the value of a DOM element
getValue : (HasIO io, DomValue value) => (e : DomElement value innerHTML) -> io value
getValue e = toDomValue <$> primIO (prim__getValue e.elemID)

%foreign "javascript:lambda:(name,v)=>document.getElementById(name).value = v"
prim__setValue : String -> String -> PrimIO () 

export
-- Proof of equivalence via referential transparency
||| Set the value of a DOM element
setValue : (HasIO io, DomValue value) => (e : DomElement value innerHTML) -> value -> io ()
setValue e v = primIO (prim__setValue e.elemID (fromDomValue v))

%foreign "javascript:lambda:name=>document.getElementById(name).innerHTML"
prim__getInnerHTML : String -> PrimIO String 

export
-- Proof of equivalence via referential transparency
||| Get the innerHTML of a DOM element
getInnerHTML : (HasIO io, DomValue innerHTML) => (e : DomElement value innerHTML) -> io innerHTML
getInnerHTML e = toDomValue <$> primIO (prim__getInnerHTML e.elemID)

%foreign "javascript:lambda:(name,v)=>document.getElementById(name).innerHTML = v" 
prim__setInnerHTML : String -> String -> PrimIO () 

export
-- Proof of equivalence via referential transparency
||| Set the innerHTML of a DOM element
setInnerHTML : (HasIO io, DomValue innerHTML) => (e : DomElement value innerHTML) -> innerHTML -> io ()
setInnerHTML e v = primIO (prim__setInnerHTML e.elemID (fromDomValue v))

%foreign "javascript:lambda:(name,etype,handler)=>document.getElementById(name).addEventListener(etype,handler)"
prim__addEventListener : String -> String -> IO () -> PrimIO ()

export
-- Proof of equivalence via referential transparency
||| Add an event listener to a DOM element
addEventListener : HasIO io => (e : DomElement value innerHTML) -> String -> IO () -> io ()
addEventListener elem etype handler = primIO (prim__addEventListener elem.elemID etype handler)

%foreign "javascript:lambda:(name,c)=>document.getElementById(name).classList.add(c)"
prim__addClass : String -> String -> PrimIO ()

export
addClass : HasIO io => DomElement a b -> String -> io ()
addClass elem c = primIO (prim__addClass elem.elemID c)

%foreign "javascript:lambda:(name,c)=>document.getElementById(name).classList.remove(c)"
prim__removeClass : String -> String -> PrimIO ()

export 
removeClass : HasIO io => DomElement a b -> String -> io ()
removeClass elem c = primIO (prim__removeClass elem.elemID c)

