// Authentication Module
// Initial setup for user authentication

function login(username, password) {
    if (!username || !password) {
        return { success: false, message: "Missing credentials" };
    }
    return { success: true, message: "Login successful" };
}

function logout(userId) {
    console.log(`User ${userId} logged out`);
    return { success: true };
}

function verifyToken(token) {
    if (!token) return false;
    return token.startsWith("Bearer ");
}

module.exports = { login, logout, verifyToken };
