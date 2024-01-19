export default function BuilderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="h-screen">{children}</div>;
}
