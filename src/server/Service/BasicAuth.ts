import * as auth from 'basic-auth';
import * as express from 'express';

/**
 * Basic Auth
 * @param user: user name
 * @param pass: password
 */
export default (users: {}) => {
    return (request: express.Request, response: express.Response, next: express.NextFunction): express.Response | void => {
        const result = auth(request);
        if (typeof result === 'undefined' || !users[result.name] || result.pass !== users[result.name]) {
            // 認証を求める
            response.set('WWW-Authenticate', 'Basic realm="EPGStation"');

            return response.status(401).send();
        }

        return next();
    };
};

