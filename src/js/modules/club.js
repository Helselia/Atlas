/**
 * ONE AMONG THE FENCE
 * 
 * Atlas : Atlas.js
 * 
 * Copyright (c) Adelaide Development and Atlas' Authors / Contributors 2020-
 * 
**/

// Consts and Requires
const { Base, fetch } = require("./base")

// Main source code
class Club extends Base {

    constructor() {
        super(Base)
    }

    /**
     * Create Club
     * @param String name 
     * @param String description 
     * @param String token 
     * @param String result 
    **/
    create(name, description, token, result) {
        if (!name) return console.error("No name provided.")
        if (!description) return console.error("No description provided.")
        if (!token) return console.error("No token provided.")
        const output = JSON.stringify({ name, description })
        fetch(`https://adelaide-api.herokuapp.com/club/new`, {
            method: "POST",
            body: output,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }).then((res) => res.json()).then((json) => {
            if (json.error_code) {
                console.error(`Error code: ${json.error_code} | ${json.msg}`)
            } else {
                console.log(`Success! Club "` + name + `" has been created with the id "` + json.id + `".`)
            }
            if (result) {
                return result(json)
            } else {
                return console.log(json)
            }
        })
    }

    /**
     * Join Club
     * @param String club_id 
     * @param String token 
     * @param String result 
    **/
    join(club_id, token, result) {
        if (!club_id) return console.error("No club ID provided.")
        if (!token) return console.error("No token provided.")
        const output = JSON.stringify({ club_id })
        fetch(`https://adelaide-api.herokuapp.com/club/join/@me`, {
            method: "PATCH",
            body: output,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(json => {
            if (json.error_code) {
                console.error(`Error Code: ${json.error_code} | ${json.msg}`)
            } else {
                console.log(`Club "${json.name}" has been joined.`)
            }
            if (result) {
                return result(json)
            } else {
                return console.log(json)
            }
        })
    }

}

// Exports
module.exports = Club
