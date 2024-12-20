// 해당 디렉토리의 파일들을 빌드 시점에 가져옴
const images = import.meta.glob('@/assets/images/champions/*.png', { eager: true})
const championImages: { [key: string]: string } = {};

// championImages 객체에 파일명을 키로 하여 이미지 경로를 저장
for (const path in images) {
    const fileName = path.split('/').pop()?.replace('.png', '');

    if (fileName) {
        championImages[fileName] = (images[path] as { default: string}).default
    }
}

export default championImages;