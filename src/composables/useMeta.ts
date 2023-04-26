export default function useMeta() {
    return {
        defineTitle(title: string): void{
            if(title.length > 60 || title.length === 0 ) throw new Error('Invalid page title')

            document.title = title;
        },
    }
}