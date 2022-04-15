

export default function Layout({ children }){
    return (
        <>
            <NavBar />
            <main className={styles.main}>{children}</main>
            <Footer />
        </>
    );
}