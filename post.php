<?php require __DIR__.'/lib.php';
$p=find_post((string)($_GET['slug']??''));
if(!$p){http_response_code(404);
head('Article not found','The requested article could not be found.',site_url('/blog/'));
echo '<section class="notfound container"><h1>Article not found</h1><a class="button" href="/blog/">Back to the journal</a></section>';foot();exit;} $all=posts();
$i=array_search($p['slug'],array_column($all,'slug'),true);
$prev=$i!==false&&isset($all[$i+1])?$all[$i+1]:null;$next=$i!==false&&$i>0?$all[$i-1]:null;
head($p['title'],$p['description'],site_url('/blog/'.$p['slug'].'/'),$p['coverImage']);?>
<article>
    <header class="article-head">
        <div class="container narrow">
            <div class="meta">
                <span><?=e($p['category'])?></span>
                <time><?=e(datef($p['date']))?></time>
            </div>
            <h1><?=e($p['title'])?></h1>
            <p><?=e($p['description'])?></p>
            <small>By <?=e($p['author'])?> · <?=e(datef($p['date']))?></small>
        </div>
    </header>
    <div class="container narrow">
        <img class="article-cover" src="<?=e($p['coverImage'])?>" alt=""></div>
        <div class="container article-layout">
            <aside>
                <a href="/blog/">← All articles</a>
                <p><?=e($p['category'])?></p>
            </aside>
            <div class="content"><?=md($p['markdown'])?><?php if($p['tags']):?><div class="tags"><?php foreach($p['tags'] as $t):?><span>#<?=e($t)?></span><?php endforeach;?></div><?php endif;?></div>
        </div>
    </div>
</article>
<nav class="article-nav">
    <div class="container">
        <div>
            <?php if($prev): ?>
                <small>Previous</small>
                <a href="/blog/<?=e($prev['slug'])?>/">← <?=e($prev['title'])?></a>
            <?php endif; ?>
        </div>
        <div>
            <?php if($next): ?>
                <small>Next</small>
                <a href="/blog/<?=e($next['slug'])?>/"> <?=e($next['title'])?> →</a>
            <?php endif; ?>
        </div>
    </div>
</nav>
<?php foot(); ?>
