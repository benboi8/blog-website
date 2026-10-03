<?php require __DIR__.'/lib.php';
$ps=posts(); 
$f=$ps[0]??null; 
head(SITE_NAME,SITE_DESCRIPTION,site_url('/')); 
?>
<section class="hero">
    <div class="container hero-grid">
        <div>
            <span class="kicker">● Ideas for the modern web</span>
            <h1>Thoughtful writing about <em>technology</em>, design, and making things.</h1>
            <p>Northstar Journal is an independent publication for people who build, design, and think deeply about the digital world.</p>
            <div class="actions">
                <a class="button" href="/blog/">Explore the journal →</a>
                <a href="#about">About the publication</a>
            </div>
        </div>
        <aside class="quote">
            <small>FIELD NOTES / 01</small>
            <blockquote>“The best software disappears into the work. The best writing helps you see the work differently.”</blockquote>
        </aside>
    </div>
</section>
<?php if($f): ?>
    <section class="section">
        <div class="container">
            <div class="section-head">
                <div>
                    <small>LATEST</small>
                    <h2>Featured story</h2>
                </div>
                <a href="/blog/">View all ↗</a>
            </div>
            <article class="featured">
                <a href="/blog/<?=e($f['slug'])?>/">
                    <img src="<?=e($f['coverImage'])?>" alt="">
                </a>
                <div>
                    <div class="meta">
                        <span><?=e($f['category'])?></span>
                        <time><?=e(datef($f['date']))?></time>
                    </div>
                    <h2>
                        <a href="/blog/<?=e($f['slug'])?>/"><?=e($f['title'])?></a>
                    </h2>
                    <p><?=e($f['description'])?></p>
                    <small>By <?=e($f['author'])?></small>
                </div>
            </article>
        </div>
    </section>
<?php endif; ?>
<?php if(count($ps)>1): ?>
    <section class="section">
        <div class="container">
            <div class="section-head">
                <div>
                    <small>FROM THE JOURNAL</small>
                    <h2>Recent articles</h2>
                </div>
            </div>
            <div class="grid">
                <?php foreach(array_slice($ps,1,3) as $p) card($p); ?>
            </div>
        </div>
    </section>
<?php endif; ?>
<section class="topics">
    <div class="container topic-grid">
        <div>
            <small>BROWSE</small>
            <h2>Explore by topic</h2>
            <p>Practical notes and long-form essays across the subjects we write about most.</p>
        </div>
        <div class="topic-list">
            <?php $cats=[];foreach($ps as $p)$cats[$p['category']]=($cats[$p['category']]??0)+1;foreach($cats as $c=>$n): ?>
                <a href="/blog/?category=<?=urlencode($c)?>">
                    <span><?=e($c)?></span>
                    <small><?=$n?> <?= $n===1?'article':'articles' ?></small>↗
                </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>
<section class="about" id="about">
    <div class="container topic-grid">
        <div>
            <small>ABOUT</small>
            <h2>A small publication with a wide lens.</h2>
        </div>
        <div>
            <p>Northstar Journal covers the ideas, tools, and craft behind modern digital work. We value clarity over noise, useful details over hot takes, and durable ideas over short-lived trends.</p>
        </div>
    </div>
</section>
<?php foot(); ?>
