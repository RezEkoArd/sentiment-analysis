import { dataProps } from "@/lib/utils";
import { RandomForestClassifier } from "ml-random-forest";

export type FeaturesProps = {
    rating: number,
    reviewLength: number,
    uniqueWords: number,
}

export type DataFeatures = {
    features: FeaturesProps;
    label: number;
}

export type ResultInitialProcess = {
    rating: number,
    reviewLength: number,
    uniqueWords: number,
    label: number,

}

export const processData = (data: dataProps[]) => {
    return data.map((item) => ({
        features: {
            rating: item.Rating,
            reviewLength: item["Review Text"].split(" ").length,
            uniqueWords: new Set(item.stemming_data.split(" ")).size,
        },
        label: item.sentimen === "negatif" ? 0 : 1, // Label 0 untuk negatif, 1 untuk positif
    }));
}

// SplitData Process
export const splitData = (data: any[], trainRatio = 0.7) => {
    const trainSize = Math.floor(data.length * trainRatio);
    const shuffled = [...data].sort(() => 0.5 - Math.random()); //Randomize
    return {
        train: shuffled.slice(0,trainSize),
        test: shuffled.slice(trainSize),
    };
} ;

// Model Random Forest

export const trainModelFromLocalStorage = () => {
    const dataString = localStorage.getItem('trainData'); //! Perhatikan
    if (!dataString) {
        console.error('Training data not found in localStorage.');
        return null;
    }

    const data = JSON.parse(dataString);
    
    const cleanedData = data.filter((d: ResultInitialProcess) => 
        typeof d.rating === 'number' &&
        typeof d.reviewLength === 'number' &&
        typeof d.uniqueWords === 'number' &&
        typeof d.label === 'number'
    )

    const features = cleanedData.map((d: FeaturesProps) => [
        d.rating,
        d.reviewLength,
        d.uniqueWords
    ])

    const labels = cleanedData.map((d: ResultInitialProcess) => d.label)


    if (features.length === 0 || labels.length === 0) {
        console.error('No valid data found for training.');
        return null;
    }

    const totalFeatures = features[0]?.length || 0; 

    const classifier = new RandomForestClassifier({
        seed: 42,
        maxFeatures: totalFeatures,
        replacement: true,
        nEstimators: 100,
    });

    classifier.train(features, labels);
    return classifier;
}   

export const predict = (classifier: RandomForestClassifier, input: number[]): number => {
    return classifier.predict([input])[0];
};

export const getTrees = (classifier: RandomForestClassifier) => {
    return classifier.estimators?.map((tree) => tree.toJSON())
}