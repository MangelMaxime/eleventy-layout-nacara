import Nano, { h } from "nano-jsx";

export default function favIconFromEmojiFilter (emoji: string) {
    const SvgContent = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <text y=".9em" font-size="90">
                {emoji}
            </text>
        </svg>
    );

    const encodedSvg = encodeURIComponent(Nano.renderSSR(<SvgContent />));

    const LinkElement = () => (
        <link
            rel="icon"
            href={`data:image/svg+xml,${encodedSvg}`}
            type="image/svg+xml"
        />
    );

    return Nano.renderSSR(<LinkElement />);
}

module.exports = favIconFromEmojiFilter;
