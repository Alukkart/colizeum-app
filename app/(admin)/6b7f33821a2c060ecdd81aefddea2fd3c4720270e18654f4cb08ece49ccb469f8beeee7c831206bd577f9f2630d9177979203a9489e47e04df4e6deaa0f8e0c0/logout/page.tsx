export default async function LoginPage() {
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? process.env.NEXTAUTH_URL ?? 'http://localhost:3000';
    await fetch(new URL('/api/logout', base).toString(), {
        method: 'POST',
    });

    return (
        <>
        </>
    )
}
