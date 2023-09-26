import styles from './MenuHamburger.module.css'

export default function MenuHamburger({open, setOpen}:{open:boolean, setOpen:any}){
    return(
        <div className={`${styles.Hamburger} ${open?styles.open:''}`} onClick={()=>setOpen((prev:boolean)=>!prev)}>
            <span className="bg-black dark:bg-white"></span>
            <span className="bg-black dark:bg-white"></span>
            <span className="bg-black dark:bg-white"></span>
            <span className="bg-black dark:bg-white"></span>
            <span className="bg-black dark:bg-white"></span>
            <span className="bg-black dark:bg-white"></span>

        </div>
    )
}