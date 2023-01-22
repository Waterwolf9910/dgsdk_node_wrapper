
export enum Result {
    /**
     * Everything is good
     */
    Ok = 0,
    /**
     * Discord isn't working
     */
    ServiceUnavailable = 1,
    /**
     * The SDK version may be outdated
     */
    InvalidVersion = 2,
    /**
     * An internal error on transactional operations
     */
    LockFailed = 3,
    /**
     * Something on our side went wrong
     */
    InternalError = 4,
    /**
     * The data you sent didn't match what we expect
     */
    InvalidPayload = 5,
    /**
     * That's not a thing you can do
     */
    InvalidCommand = 6,
    /**
     * You aren't authorized to do that
     */
    InvalidPermissions = 7,
    /**
     * Couldn't fetch what you wanted
     */
    NotFetched = 8,
    /**
     * What you're looking for doesn't exist
     */
    NotFound = 9,
    /**
     * User already has a network connection open on that channel
     */
    Conflict = 10,
    /**
     * Activity secrets must be unique and not match party id
     */
    InvalidSecret = 11,
    /**
     * Join request for the user does not exist
     */
    InvalidJoinSecret = 12,
    /**
     * You accidentally set an ApplicationId in your UpdateActivity() payload
     */
    NoEligigbleActivity = 13,
    /**
     * Your game invite is no longer valid
     */
    InvalidInvite = 14,
    /**
     * The internal auth call failed for the user, and you can't do this
     */
    NotAuthenticated = 15,
    /**
     * The user's bearer token is invalid
     */
    InvalidAccessToken = 16,
    /**
     * Access token belongs to another application
     */
    ApplicationMismatch = 17,
    /**
     * Something internally went wrong fetching image data
     */
    InvalidDataUrl = 18,
    /**
     * Not valid Base64 data
     */
    InvalidBase64 = 19,
    /**
     * You're trying to access the list before creating a stable list with Filter()
     */
    NotFiltered = 20,
    /**
     * The lobby is full
     */
    LobbyFull = 21,
    /**
     * The secret you're using to connect is wrong
     */
    InvalidLobbySecret = 22,
    /**
     * File name is too long
     */
    InvalidFilename = 23,
    /**
     * File is too large
     */
    InvalidFileSize = 24,
    /**
     * The user does not have the right entitlement for this game
     */
    InvalidEntitlement = 25,
    /**
     * Discord is not installed
     */
    NotInstalled = 26,
    /**
     * Discord is not running
     */
    NotRunning = 27,
    /**
     * Insufficient buffer space when trying to write
     */
    InsufficientBuffer = 28,
    /**
     * User cancelled the purchace flow
     */
    PurchaseCanclled = 29,
    /**
     * Discord guild does not exist
     */
    InvalidGuild = 30,
    /**
     * The event you're trying to subscribe to does not exist
     */
    InvalidEvent = 31,
    /**
     * Discord channel does not exist
     */
    InvalidChannel = 32,
    /**
     * The origin header on the socket does not match what you've registered (you should not see this)
     */
    InvalidOrigin = 33,
    /**
     * You are calling that method too quickly
     */
    RateLimited = 34,
    /**
     * The OAuth2 process failed at some point
     */
    OAuth2Error = 35,
    /**
     * The user took too long selecting a channel for an invite
     */
    SelectChannelTimeout = 36,
    /**
     * Took too long trying to fetch the guild
     */
    GetGuildTimeout = 37,
    /**
     * Push to talk is required for this channel
     */
    SelectVoiceForceRequired = 38,
    /**
     * That push to talk shortcut is already registered
     */
    CaptureShortcutAlreadyListening = 39,
    /**
     * Your application cannot update this achievement
     */
    UnauthorizedForAchievement = 40,
    /**
     * The gift code is not valid
     */
    InvalidGiftCode = 41,
    /**
     * Something went wrong during the purchase flow
     */
    PurchaseError = 42,
    /**
     * Purchase flow aborted because the SDK is being torn down
     */
    TransactionAborted = 43
}

export enum CreateFlags {
    /**
     * Requires Discord to be running to play the game
     */
    Default = 0,
    /**
     * Does not require Discord to be running, use this on other platforms
     */
    NoRequireDiscord = 1
}

export enum LogLevel {
    Error = 1,
    Warning = 2,
    Info = 3,
    Debug = 4
}

export type user = {
    /**
     * the user's id
     */
    id: number
    /**
     * their name
     */
    username: string 
}


export interface sdk {
    run_callbacks: () => Result,
    set_log_hook: (level: LogLevel, logger: (level: LogLevel, msg: string) => any) => any
    tl: (a: () => any) => any
}

export interface base {
}

export interface wsdk extends base {
    sdk: sdk
    status: Result.Ok
}

export interface wosdk extends base {
    sdk: null,
    status: Exclude<Result, Result.Ok>
}

export type create_return = wsdk | wosdk

