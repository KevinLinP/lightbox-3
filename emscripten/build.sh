em++ program.cpp -sEXPORTED_FUNCTIONS=_setup,_loop,_getWidth,_getHeight -s STANDALONE_WASM -sEXPORTED_RUNTIME_METHODS=ccall,cwrap --no-entry -o program.js
