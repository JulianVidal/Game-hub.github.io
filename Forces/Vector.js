class Vector {

    // Creates magnitude and angle based on given argument
    constructor(magnitude, angle) {
        this.magnitude = magnitude;
        this.angle = angle * (Math.PI / 180);
    }

    // Adds two vectors
    static add(v1, v2) {

        // Checks one of the vector's magnitude is equal to zero
        // Returns vector that is not equal to zero
        if (v1.magnitude > 0 && v2.magnitude > 0) {
            // Resolves both vectors into it's X vector and Y vector
            const Y = new Vector(Math.abs(Vector.resolve(v1).y + Vector.resolve(v2).y), Vector.resolve(v1).y + Vector.resolve(v2).y >= 0 ? 90 : 270);
            const X = new Vector(Math.abs(Vector.resolve(v1).x + Vector.resolve(v2).x), Vector.resolve(v1).x + Vector.resolve(v2).x >= 0 ? 0 : 180);

            // Draws resolved vectors
            if (resolvedNetForceB) {
                Y.draw(particle, true, color(0, 255, 0));
                X.draw(particle, true, color(0, 255, 0));
            }

            // Magnitude of added vector ( sqrt( x^2 + y^2 ) )
            const magnitude = Math.hypot(X.magnitude, Y.magnitude);

            // Adj side will be the one with the lowest angle
            let adj = X.angle < Y.angle ? X : Y;
            let opp = X.angle > Y.angle ? X : Y;

            //  360 = 0 so 270 is the lowest angle
            if (Y.angle === 270 * Math.PI / 180) {
                adj = Y;
                opp = X;
            }

            // The extra angle needed to add vectors properly
            const extra  = adj.angle;

            // Calculate the angle of the new vector ( tan^-1(opp / adj) )
            const angleRad = Math.atan(opp.magnitude / adj.magnitude) + extra;
            // Vector class only accepts degrees
            const angleDeg = angleRad / (Math.PI / 180);

            // Returns the new added vector
            return new Vector(magnitude, angleDeg);
        } else {

            // Returns vector with magnitude bigger than zero
            return v1.magnitude > v2.magnitude ? v1 : v2;
        }
    }

    // Function that resolves the x and y magnitudes of a vector
    static resolve(v) {
        // x and y magnitudes of a vector
        // x = mag * cos(angle)
        // y = mag * sin(angle)
        const vx = v.magnitude * (Math.round(Math.cos(v.angle) * 1000) / 1000);
        const vy = v.magnitude * (Math.round(Math.sin(v.angle) * 1000) / 1000);

        // Returns both magnitudes as objects
        return {
            x: vx,
            y: vy
        }
    }

    // Draws a line from the origin to the vectors magnitude and angle
    // Arrows are the two lines from the end of the vector
    // c is the color
    draw(origin, arrows, c) {
        // prop will multiply onto magnitudes to make the seem larger
        const prop = 5000;

        // Changes the color of the line to c
        stroke(c);

        // Draws line from origin to vector
        line(origin.x, origin.y, Vector.resolve(this).x * prop + origin.x, -Vector.resolve(this).y * prop + origin.y);

        // Draws both lines to create an arrow
        if (arrows) {
            let arrowLeg = new Vector( 0.001,  degrees(this.angle) + 140);
            arrowLeg.draw(
                {
                    x:Vector.resolve(this).x * prop + origin.x,
                    y:-Vector.resolve(this).y * prop + origin.y
                },
                false,
                c
            );

            arrowLeg = new Vector( 0.001,  degrees(this.angle) - 140);
            arrowLeg.draw(
                {
                    x:Vector.resolve(this).x * prop + origin.x,
                    y:-Vector.resolve(this).y * prop + origin.y
                },
                false,
                c
            );


        }

    }

    // Adds the vector to the velocity(part)
    enact( part ) {
        // part.y is subtracted due to the y being positive while it goes down
        part.x += Vector.resolve(this).x;
        part.y -= Vector.resolve(this).y;

    }
}