let idMap = {};

const getId = () => {
    while (true) {
        let id = Math.floor(Math.random() * 1000);
        if (!idMap[id]) {
            idMap[id] = 1;
            return id;
        }
    }
};

const getRandTime = (min, max) => {
    return (Math.floor(Math.random() * (max - min)) + min) * 60 * 1000;
};

module.exports = { getId, getRandTime };
