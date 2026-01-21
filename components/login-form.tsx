import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {useState} from "react";

export function LoginForm({className, ...props}: React.ComponentProps<"div">) {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const res = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({
                login: login,
                password: password,
            }),
        })

        if (res.ok) {
            window.location.href = '/6b7f33821a2c060ecdd81aefddea2fd3c4720270e18654f4cb08ece49ccb469f8beeee7c831206bd577f9f2630d9177979203a9489e47e04df4e6deaa0f8e0c0'
        } else {
            alert('Ошибка')
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className='text-center'>
                    <CardTitle>Login to your account</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="username">Username</FieldLabel>
                                <Input
                                    id="username"
                                    type="username"
                                    placeholder="username"
                                    onChange={(e) => setLogin(e.target.value)}
                                    required
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder='********'
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Field>
                            <Field>
                                <Button type="submit">Login</Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
