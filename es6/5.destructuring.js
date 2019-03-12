(function arrayMatching() {
    console.log('Array Matching');
    const name = 'gildong, hong';

    const [firstName, lastName] = name.split(', ');

    console.log(firstName, lastName);
})();

const user = {id: 1, name: { first: 'gildong', last: 'hong'}, items: ['apple', 'banna'] };

(function objectShorthand() {
    console.log('\nObject Shorthand\n');

    const { id, name: { first, last } } = user;

    console.log(id, first, last);
})();


(function parameterMatching() {
    console.log('\nParameter Matching\n');

    const func = ({id, name: { first: firstName, last: lastName}, items: [first, second]}) => {
        console.log(id);
        console.log(firstName, lastName);
        console.log(first, second);
    };

    func(user);
})();

