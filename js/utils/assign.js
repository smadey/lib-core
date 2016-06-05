export function assign(obj) {
    const args = [].slice.call(arguments, 0); // eslint-disable-line prefer-rest-params

    if (args.length === 0) {
        return obj;
    }

    const keys = Object.keys(obj);

    args.forEach((arg) => {
        let i = keys.length;

        while (i--) {
            if (typeof arg[keys[i]] !== 'undefined') {
                obj[keys[i]] = arg[keys[i]];
            }
        }
    });

    return obj;
}

export default {
    extend,
};
