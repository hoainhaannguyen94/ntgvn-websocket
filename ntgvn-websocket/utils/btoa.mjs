const btoa = (str = '') => {
    return Buffer.from(str, 'binary').toString('base64');
}

export { btoa }
