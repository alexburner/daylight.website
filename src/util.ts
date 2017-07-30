import { CX, CY, RADIUS, MS_PER_DEG } from 'src/constants';
import { Point } from 'src/interfaces';

export const getTimeAngle = (time: number, zeroTime: number): number => {
    const diff = time - zeroTime;
    const angle = diff / MS_PER_DEG;
    return angle + 90;
};

export const getCirclePoint = (angle: number): Point => rotatePoint({
    point: { x: CX + RADIUS, y: CY },
    origin: { x: CX, y: CY },
    angle,
});

export const rotatePoint = ({ point, origin, angle }: {
    point: Point;
    origin: Point;
    angle: number;
}): Point => {
    const radians = (Math.PI / 180) * angle;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    return {
        x: (
            (cos * (point.x - origin.x))
            + (sin * (point.y - origin.y))
            + origin.x
        ),
        y: (
            (cos * (point.y - origin.y))
            - (sin * (point.x - origin.x))
            + origin.y
        ),
    };
};
