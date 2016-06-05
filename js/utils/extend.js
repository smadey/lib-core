export function extend(obj) {
    const args = [].slice.call(arguments, 0); // eslint-disable-line prefer-rest-params

    if (args.length === 0) {
        return obj;
    }

    args.forEach((arg) => {
        const keys = Object.keys(arg);
        let i = keys.length;

        while (i--) {
            obj[keys[i]] = arg[keys[i]];
        }
    });

    return obj;
}
