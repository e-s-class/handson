(function expressionBody() {
    console.log('1. Expression body vs Statement body');

    const func1 = () => {
        return 'abcd';
    };

    const func2 = () => 'abcd';

    console.log(func1(), func2());

    const func3 = () => {
        return {
            text: '123'
        }
    };
    const func4 = () => ({text: '123'});

    console.log(func3(), func4());
})();

(function lexicalThis() {
    this.name = 'lexical this?';

    const es5Function = function() {
        console.log(this.name);
    };

    const arrowFunction = () =>  {
        console.log(this.name);;
    };

    const me = this;
    const keepThis = function() {
        console.log(me.name);
    };

    console.log('\n 2. Lexical this');
    setTimeout(es5Function);
    setTimeout(arrowFunction);
    setTimeout(es5Function.bind(this));
    setTimeout(keepThis);
})();
