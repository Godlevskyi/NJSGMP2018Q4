import config from '../config/config';
import jwt from 'jsonwebtoken';


const sign = user => jwt.sign({ sub: user.email }, config.auth.secret);

const verify = (token, done, failed) => jwt.verify(token, config.auth.secret, err => {
    if (err) {
        failed();
        return;
    }
    done();
});

const formatAuthSuccessResponse = (user) => {
    return {
        code: 200,
        message: "ok",
        data: {
            user: {
                email: user.email,
                username: user.name
            }
        },
        token: sign(user)
    }
};

const formatAuthFalreResponse = (code, msg) => {
    return {
        code: code,
        message: msg
    }
};

export default { formatAuthFalreResponse, formatAuthSuccessResponse, verify };