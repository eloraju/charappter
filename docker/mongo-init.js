print('######################## Running init script ########################');
const collections = [
    'traits',
    'rules',
    'characters',
    'games',
    'users',
    'items'
];

db = db.getSiblingDB('dev');
print('Creating development database');
db.createUser({
    user: 'dev',
    pwd: 'password',
    roles: [{ role: 'readWrite', db: 'dev' }]
});
collections.forEach((c) => db.createCollection(c));

print('Creating testing database');
db = db.getSiblingDB('test');
db.createUser({
    user: 'test',
    pwd: 'test',
    roles: [{ role: 'readWrite', db: 'test' }]
});
collections.forEach((c) => db.createCollection(c));
print('######################## init script done ########################');
