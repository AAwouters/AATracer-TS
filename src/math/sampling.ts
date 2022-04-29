import { Point2 } from "../math";

export enum SampleType {
    Regular,
    Random,
}

/// Generates samples in the range [0,1) depending on the sample type
export function generate_samples(sample_type: SampleType, nb_of_samples: number): Point2[] {
    switch (sample_type) {
        case SampleType.Regular: {
            return generate_regular_samples(nb_of_samples);
        }
        case SampleType.Random: {
            return generate_random_samples(nb_of_samples);
        }
    }
}

function generate_regular_samples(nb_of_samples: number): Point2[] {
    let nb = Math.floor(Math.sqrt(nb_of_samples));
    let result = new Array(nb);

    for (let x = 0; x < nb; x++) {
        for (let y = 0; y < nb; y++) {
            result.push(new Point2(
                (x + 0.5) / nb,
                (y + 0.5) / nb,
            ));
        }
    }

    return result;
}

function generate_random_samples(nb_of_samples: number): Point2[] {
    let result = new Array(nb_of_samples);

    for (let i = 0; i < nb_of_samples; i++) {
        result.push(Point2.random());
    }

    return result;
}