"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogLevel = exports.CreateFlags = exports.Result = void 0;
var Result;
(function (Result) {
    /**
     * Everything is good
     */
    Result[Result["Ok"] = 0] = "Ok";
    /**
     * Discord isn't working
     */
    Result[Result["ServiceUnavailable"] = 1] = "ServiceUnavailable";
    /**
     * The SDK version may be outdated
     */
    Result[Result["InvalidVersion"] = 2] = "InvalidVersion";
    /**
     * An internal error on transactional operations
     */
    Result[Result["LockFailed"] = 3] = "LockFailed";
    /**
     * Something on our side went wrong
     */
    Result[Result["InternalError"] = 4] = "InternalError";
    /**
     * The data you sent didn't match what we expect
     */
    Result[Result["InvalidPayload"] = 5] = "InvalidPayload";
    /**
     * That's not a thing you can do
     */
    Result[Result["InvalidCommand"] = 6] = "InvalidCommand";
    /**
     * You aren't authorized to do that
     */
    Result[Result["InvalidPermissions"] = 7] = "InvalidPermissions";
    /**
     * Couldn't fetch what you wanted
     */
    Result[Result["NotFetched"] = 8] = "NotFetched";
    /**
     * What you're looking for doesn't exist
     */
    Result[Result["NotFound"] = 9] = "NotFound";
    /**
     * User already has a network connection open on that channel
     */
    Result[Result["Conflict"] = 10] = "Conflict";
    /**
     * Activity secrets must be unique and not match party id
     */
    Result[Result["InvalidSecret"] = 11] = "InvalidSecret";
    /**
     * Join request for the user does not exist
     */
    Result[Result["InvalidJoinSecret"] = 12] = "InvalidJoinSecret";
    /**
     * You accidentally set an ApplicationId in your UpdateActivity() payload
     */
    Result[Result["NoEligigbleActivity"] = 13] = "NoEligigbleActivity";
    /**
     * Your game invite is no longer valid
     */
    Result[Result["InvalidInvite"] = 14] = "InvalidInvite";
    /**
     * The internal auth call failed for the user, and you can't do this
     */
    Result[Result["NotAuthenticated"] = 15] = "NotAuthenticated";
    /**
     * The user's bearer token is invalid
     */
    Result[Result["InvalidAccessToken"] = 16] = "InvalidAccessToken";
    /**
     * Access token belongs to another application
     */
    Result[Result["ApplicationMismatch"] = 17] = "ApplicationMismatch";
    /**
     * Something internally went wrong fetching image data
     */
    Result[Result["InvalidDataUrl"] = 18] = "InvalidDataUrl";
    /**
     * Not valid Base64 data
     */
    Result[Result["InvalidBase64"] = 19] = "InvalidBase64";
    /**
     * You're trying to access the list before creating a stable list with Filter()
     */
    Result[Result["NotFiltered"] = 20] = "NotFiltered";
    /**
     * The lobby is full
     */
    Result[Result["LobbyFull"] = 21] = "LobbyFull";
    /**
     * The secret you're using to connect is wrong
     */
    Result[Result["InvalidLobbySecret"] = 22] = "InvalidLobbySecret";
    /**
     * File name is too long
     */
    Result[Result["InvalidFilename"] = 23] = "InvalidFilename";
    /**
     * File is too large
     */
    Result[Result["InvalidFileSize"] = 24] = "InvalidFileSize";
    /**
     * The user does not have the right entitlement for this game
     */
    Result[Result["InvalidEntitlement"] = 25] = "InvalidEntitlement";
    /**
     * Discord is not installed
     */
    Result[Result["NotInstalled"] = 26] = "NotInstalled";
    /**
     * Discord is not running
     */
    Result[Result["NotRunning"] = 27] = "NotRunning";
    /**
     * Insufficient buffer space when trying to write
     */
    Result[Result["InsufficientBuffer"] = 28] = "InsufficientBuffer";
    /**
     * User cancelled the purchace flow
     */
    Result[Result["PurchaseCanclled"] = 29] = "PurchaseCanclled";
    /**
     * Discord guild does not exist
     */
    Result[Result["InvalidGuild"] = 30] = "InvalidGuild";
    /**
     * The event you're trying to subscribe to does not exist
     */
    Result[Result["InvalidEvent"] = 31] = "InvalidEvent";
    /**
     * Discord channel does not exist
     */
    Result[Result["InvalidChannel"] = 32] = "InvalidChannel";
    /**
     * The origin header on the socket does not match what you've registered (you should not see this)
     */
    Result[Result["InvalidOrigin"] = 33] = "InvalidOrigin";
    /**
     * You are calling that method too quickly
     */
    Result[Result["RateLimited"] = 34] = "RateLimited";
    /**
     * The OAuth2 process failed at some point
     */
    Result[Result["OAuth2Error"] = 35] = "OAuth2Error";
    /**
     * The user took too long selecting a channel for an invite
     */
    Result[Result["SelectChannelTimeout"] = 36] = "SelectChannelTimeout";
    /**
     * Took too long trying to fetch the guild
     */
    Result[Result["GetGuildTimeout"] = 37] = "GetGuildTimeout";
    /**
     * Push to talk is required for this channel
     */
    Result[Result["SelectVoiceForceRequired"] = 38] = "SelectVoiceForceRequired";
    /**
     * That push to talk shortcut is already registered
     */
    Result[Result["CaptureShortcutAlreadyListening"] = 39] = "CaptureShortcutAlreadyListening";
    /**
     * Your application cannot update this achievement
     */
    Result[Result["UnauthorizedForAchievement"] = 40] = "UnauthorizedForAchievement";
    /**
     * The gift code is not valid
     */
    Result[Result["InvalidGiftCode"] = 41] = "InvalidGiftCode";
    /**
     * Something went wrong during the purchase flow
     */
    Result[Result["PurchaseError"] = 42] = "PurchaseError";
    /**
     * Purchase flow aborted because the SDK is being torn down
     */
    Result[Result["TransactionAborted"] = 43] = "TransactionAborted";
})(Result = exports.Result || (exports.Result = {}));
var CreateFlags;
(function (CreateFlags) {
    /**
     * Requires Discord to be running to play the game
     */
    CreateFlags[CreateFlags["Default"] = 0] = "Default";
    /**
     * Does not require Discord to be running, use this on other platforms
     */
    CreateFlags[CreateFlags["NoRequireDiscord"] = 1] = "NoRequireDiscord";
})(CreateFlags = exports.CreateFlags || (exports.CreateFlags = {}));
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Error"] = 1] = "Error";
    LogLevel[LogLevel["Warning"] = 2] = "Warning";
    LogLevel[LogLevel["Info"] = 3] = "Info";
    LogLevel[LogLevel["Debug"] = 4] = "Debug";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
