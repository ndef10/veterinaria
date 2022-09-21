const cookie = (req, res, next) => {    
    if (!req.cookies.retoken) {
        return res. redirect('/403')
    }
    next();
}

module. exports = {
    cookie
}