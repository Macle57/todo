export function Form(props: { onSubmit: any, value: string, onChange: any }) {
    return <form onSubmit={props.onSubmit}>
        <input value={props.value} placeholder={"What's on ya mind?"} onChange={props.onChange}/>
        <button>Add</button>
    </form>;
}