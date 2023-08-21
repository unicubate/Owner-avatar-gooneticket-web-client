import linkifyHtml from 'linkify-html';


export const Linkify = ({ children }: { children: any }) => {
    const options = {
        className: {
            url: "text-blue-500 hover:underline",
        },
    };
    const html = linkifyHtml(children, options)
    return (<span dangerouslySetInnerHTML={{ __html: html }} />)
}