import React from 'react';
import SignOut from './SignOut';
import SignOutAll from './SignOutAll';

function SignOutFirst({ user }) {
    return (
        <div className='sign-out-first'>
            <section>
                {`Hi ${user.name}, if you wont to sign in from other account, or to sign up with a new account, you need to sign out first`}
            </section>
            <section>
                <SignOut />
            </section>
            <section>
                <SignOutAll />
            </section>
        </div>
    )
}

export default SignOutFirst;