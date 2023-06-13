const requiredSSL = (req, res, next) => {
    if (!req.secure && req.protocol !== 'https') {
        return res.redirect(`https://${req.get('host')}${req.url}`)
    }
    return next();
}

export { requiredSSL }
