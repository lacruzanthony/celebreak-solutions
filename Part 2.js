console.log('Hello, world!')

// Players who haven't play the game
async function first(date){
    const games = await db.game_signup.gameId.find({
        "start":{$lt: new Date(date).toISOString()}
        });
    return games.select("userId");
}

// 
async function second(rate, games){  
    const ratesByUsers = await db.game_review.aggregate(
        [{
            $group:{
                "user": "$userId"
                "avgRate" : {$avg: "stars"}
            }
        }]).find({
            "avgRate" : {$lt: rate}
        }).limit(games);
    
    return ratesByUsers.select('userId');
}

async function third(fieldId, from, to){
    const fieldsAvailables = db.fields_availability_slots.find(
    {
        "fieldId" : fieldId,
        "shiftStart" : {$gte: new Date(date).toISOString(from)},
        "shiftEnd" : {$lt: new Date(date).toISOString(to)}
        "bussy" : false
    })
}