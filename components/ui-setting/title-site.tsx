export const TitleSite = ({ title }: { title: string }) => {
  const spacer = title ? ' | ' : '';
  const titleOutput = `${title}${spacer}GoOneTicket`;
  return <title>{titleOutput}</title>;
};
