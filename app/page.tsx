import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Welcome to E-Shop</h1>
          <p className={styles.subtitle}>Discover amazing products at great prices</p>
        </section>

        <section className={styles.products}>
          <h2 className={styles.sectionTitle}>Featured Products</h2>
          <div className={styles.grid}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
