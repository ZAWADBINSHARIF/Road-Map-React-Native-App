const acceptedExtension: string[] = ["jpg", "png", "jpeg", "mp4", "webm", "mkv"];

const useFileExtension = (filename: string): string | false => {

    const extension: string = filename.split('.').pop() as string;
    const isAcceptableExtension = acceptedExtension.includes(extension);

    console.log(isAcceptableExtension);

    return isAcceptableExtension ? extension : false;
};

export default useFileExtension;