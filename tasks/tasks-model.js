const db = require('../data/db-config'); 

module.exports = {
    find, 
    findById, 
    add,  
    remove
};

function find(){
    return db('tasks');
}; 

function findById(id){
    return db('tasks')
        .where({ id })
        .first();
}; 

function add(item){
    return db('tasks')
        .insert(item, 'id')
            .then(([id]) => {
                return findById(id)
            });
}; 

function remove(id){
    return db('tasks')
        .where({ id })
        .del();
}; 
