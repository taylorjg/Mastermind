import JSC from 'jscheck';

export default (name, predicate, signature, reps, msPerRep) => {

    it(name, done => {

        let ok = true;
        let exception = undefined;

        JSC.on_result(result => {
            if (result.ok) {
                done();
            } else {
                ok = false;
                done(exception || new Error('Property test failure'));
            }
        });

        JSC.on_fail(obj => exception = obj.exception);
        JSC.on_lost(obj => exception = obj.exception);
        JSC.on_report(s => !ok && console.error(s));

        JSC
            .reps(reps)
            .check(JSC.claim(name, predicate, signature));
            
    }).timeout(msPerRep * reps);
};
