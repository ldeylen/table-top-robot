import {
    directionNorth,
    directionEast,
    directionSouth,
    directionWest,
    getLeftDirectionName,
    getRightDirectionName,
    getMovePosition,
    getAngleByDirectionName
} from './../src/assets/js/utils/robotUtils';

describe('Test Robot Utils', () => {

    it('Test getLeftDirectionName function', () => {
        expect(getLeftDirectionName(directionNorth.name)).toEqual(directionWest.name);
        expect(getLeftDirectionName(directionWest.name)).toEqual(directionSouth.name);
        expect(getLeftDirectionName(directionSouth.name)).toEqual(directionEast.name);
        expect(getLeftDirectionName(directionEast.name)).toEqual(directionNorth.name);
    });

    it('Test getRightDirectionName function', () => {
        expect(getRightDirectionName(directionNorth.name)).toEqual(directionEast.name);
        expect(getRightDirectionName(directionWest.name)).toEqual(directionNorth.name);
        expect(getRightDirectionName(directionSouth.name)).toEqual(directionWest.name);
        expect(getRightDirectionName(directionEast.name)).toEqual(directionSouth.name);
    });

    it('Test getMovePosition function', () => {
        expect(getMovePosition(1,1,directionNorth.name)).toEqual({x: 1, y: 2});
        expect(getMovePosition(1,1,directionEast.name)).toEqual({x: 2, y: 1});
        expect(getMovePosition(1,4,directionNorth.name)).toEqual(null);
        expect(getMovePosition(0,4,directionWest.name)).toEqual(null);
        expect(getMovePosition(4,4,directionEast.name)).toEqual(null);
        expect(getMovePosition(4,0,directionSouth.name)).toEqual(null);
    });

    it('Test getAngleByDirectionName function', () => {
        expect(getAngleByDirectionName(directionNorth.name)).toEqual(directionNorth.angle);
        expect(getAngleByDirectionName(directionWest.name)).toEqual(directionWest.angle);
        expect(getAngleByDirectionName(directionSouth.name)).toEqual(directionSouth.angle);
        expect(getAngleByDirectionName(directionEast.name)).toEqual(directionEast.angle);

    });

});

