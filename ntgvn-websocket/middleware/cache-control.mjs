const cacheControl = (req, res, next) => {
    const period = 60 * 5; // 5 minutes

    if (req.method === 'GET') {
        res.set('Cache-Control', `public, max-age=${period}`);
    } else {
        res.set('Cache-Control', `no-store`);
    }

    next();
}

export {
    cacheControl
}
