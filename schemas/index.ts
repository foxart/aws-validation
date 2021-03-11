export const pipe = (...fn: Function[]) => (v: any = undefined) => {
    fn.reduce((V, f) => {
        return f(V);
    }, v);
};
