import { Point } from 'src/interfaces';

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
