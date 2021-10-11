// { Component } 헷갈림
import React, { Component } from 'react';

// ECMAScript 6 문법좀 공부해야 함 class 가 있다니...

class App extends Component {
    render() {
        return (
            <div>
                <h1>Hello, React</h1>
            </div>
        )
    }
}
// App class 를 module 로 export 선언
// Javascript module 표준 방식
export default App;