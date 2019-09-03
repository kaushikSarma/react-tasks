export const readCache = (CcCacheState) => ({
    type: "READ_CC_CACHE",
    savedCurrentID: CcCacheState.savedCards.currentCardID,
    savedCards: CcCacheState.savedCards.cards,
    savedValidation: CcCacheState.validationS
});

export const updateCache = (data) => ({
    type: "UPDATE_CC_CONFIG",
    configdata: data
});

export const addCard = (data) => ({
    'type': 'ADD_CARD',
    'cardData': data
});

export const removeCard = (cardid) => ({
    'type': 'REMOVE_CARD',
    'cardID': cardid
});

export const editCard = (cardData) => ({
    'type': 'EDIT_CARD',
    'cardData': cardData
});

