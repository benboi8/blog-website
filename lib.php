<?php
declare(strict_types=1);
require_once __DIR__.'/config.php';
function e(string $s):string{
    return htmlspecialchars($s,ENT_QUOTES|ENT_SUBSTITUTE,'UTF-8');
}

function site_url(string $p=''):string{
    return rtrim(SITE_URL,'/').'/'.ltrim($p,'/');
}

function slug(string $s):string{
    $s=strtolower(trim($s));$s=preg_replace('/[^\p{L}\p{N}]+/u','-',$s)??'';return trim($s,'-');
}

function fm(string $raw):array{
    $ls=preg_split('/\r\n|\n|\r/',$raw)?:[];
    $m=[];
    if(($ls[0]??'')!=='---')
        return[$m,$raw];
    $end=null;
    for($i=1;$i<count($ls);$i++){
        if(trim($ls[$i])==='---'){
            $end=$i;break;
        }
        if($end===null){
            return[$m,$raw];
        }
        $arr=null;
        for($i=1;$i<$end;$i++){
            if(preg_match('/^([\w-]+):\s*(.*)$/',$ls[$i],$x)){
                $k=$x[1];$v=trim($x[2]);
                if($v===''){
                    $m[$k]=[];$arr=$k;
                }else{
                    $m[$k]=trim($v,'"\'');
                    $arr=null;
                }
            }
            elseif($arr&&preg_match('/^\s*-\s*(.*)$/',$ls[$i],$x)){
                $m[$arr][]=trim($x[1],'"\'');
            }
        }

    }
    return[$m,trim(implode("\n",array_slice($ls,$end+1)))];
}

    
function post(string $file):?array{
    $raw=@file_get_contents($file);if($raw===false)return null;[$m,$md]=fm($raw);$slug=slug(pathinfo($file,PATHINFO_FILENAME));$date=(string)($m['date']??date('Y-m-d',filemtime($file)));return['slug'=>$slug,'title'=>(string)($m['title']??ucwords(str_replace('-',' ',$slug))),'description'=>(string)($m['description']??''),'date'=>$date,'author'=>(string)($m['author']??SITE_AUTHOR),'category'=>(string)($m['category']??'General'),'tags'=>is_array($m['tags']??null)?$m['tags']:[],'coverImage'=>(string)($m['coverImage']??'/images/default-cover.svg'),'markdown'=>$md,'timestamp'=>strtotime($date)?:filemtime($file)];}

function posts():array{$r=[];foreach(glob(BLOG_DIR.'/*.md')?:[] as $f)if($p=post($f))$r[]=$p;usort($r,fn($a,$b)=>$b['timestamp']<=>$a['timestamp']);return$r;}

function find_post(string $s):?array{
    $s=slug($s);foreach(glob(BLOG_DIR.'/*.md')?:[] as $f)if(slug(pathinfo($f,PATHINFO_FILENAME))===$s)return post($f);return null;}

function datef(string $d):string{
    return($t=strtotime($d))?date('F j, Y',$t):$d;}

function inline_md(string $s):string{
    $s=e($s);$s=preg_replace('/!\[([^]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/','<img src="$2" alt="$1" loading="lazy">',$s)??$s;$s=preg_replace('/\[([^]]+)\]\(([^)\s]+)\)/','<a href="$2">$1</a>',$s)??$s;$s=preg_replace('/`([^`]+)`/','<code>$1</code>',$s)??$s;$s=preg_replace('/\*\*([^*]+)\*\*/','<strong>$1</strong>',$s)??$s;$s=preg_replace('/(?<!\*)\*([^*]+)\*(?!\*)/','<em>$1</em>',$s)??$s;return$s;}

function md(string $md):string{
    $ls=preg_split('/\r\n|\n|\r/',$md)?:[];$h='';$p=[];$ul=$ol=$quote=$code=false;$codeLang='';$codeLines=[];$flush=function()use(&$h,&$p){if($p){$h.='<p>'.inline_md(trim(implode(' ',array_map('trim',$p)))).'</p>';$p=[];}};$lists=function()use(&$h,&$ul,&$ol){if($ul){$h.='</ul>';$ul=false;}if($ol){$h.='</ol>';$ol=false;}};$q=function()use(&$h,&$quote){if($quote){$h.='</blockquote>';$quote=false;}};foreach($ls as $l){if($code){if(preg_match('/^\s*```/',$l)){$h.='<pre><code class="language-'.e($codeLang).'">'.e(implode("\n",$codeLines)).'</code></pre>';$code=false;$codeLines=[];$codeLang='';}else$codeLines[]=$l;continue;}if(preg_match('/^\s*```([\w+-]*)\s*$/',$l,$x)){$flush();$lists();$q();$code=true;$codeLang=$x[1]??'';continue;}if(preg_match('/^\s*(#{1,6})\s+(.+)$/',$l,$x)){$flush();$lists();$q();$n=strlen($x[1]);$h.="<h$n>".inline_md($x[2])."</h$n>";continue;}if(preg_match('/^\s*>\s?(.*)$/',$l,$x)){if(!$quote){$h.='<blockquote>';$quote=true;}$h.='<p>'.inline_md($x[1]).'</p>';continue;}if($quote){$q();}if(preg_match('/^\s*[-*+]\s+(.+)$/',$l,$x)){$flush();if($ol){$h.='</ol>';$ol=false;}if(!$ul){$h.='<ul>';$ul=true;}$h.='<li>'.inline_md($x[1]).'</li>';continue;}if(preg_match('/^\s*\d+\.\s+(.+)$/',$l,$x)){$flush();if($ul){$h.='</ul>';$ul=false;}if(!$ol){$h.='<ol>';$ol=true;}$h.='<li>'.inline_md($x[1]).'</li>';continue;}if($ul||$ol)$lists();if(trim($l)===''){$flush();continue;}if(preg_match('/^\s*(---+|\*\*\*+)\s*$/',$l)){$flush();$h.='<hr>';continue;}$p[]=$l;}$flush();$lists();$q();if($code)$h.='<pre><code>'.e(implode("\n",$codeLines)).'</code></pre>';return$h;}
    
function head(string $title,string $desc,string $url='',string $img='/images/default-cover.svg'):void{
    $title=$title===SITE_NAME?$title:$title.' — '.SITE_NAME;
    $url=$url?:site_url('/');
    $img=site_url($img);
    echo '
    <!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <meta name="description" content="'.e($desc).'">
            <link rel="canonical" href="'.e($url).'">
            <meta property="og:type" content="website">
            <meta property="og:title" content="'.e($title).'">
            <meta property="og:description" content="'.e($desc).'">
            <meta property="og:url" content="'.e($url).'">
            <meta property="og:image" content="'.e($img).'">
            <meta name="twitter:card" content="summary_large_image">
            <title>'.e($title).'</title>
            <link rel="stylesheet" href="/css/styles.css">
        </head>
        <body>
            <a class="skip" href="#main">Skip to content</a>
            <header>
                <div class="nav">
                    <a class="brand" href="/"><b>N</b>'.e(SITE_NAME).'</a>
                    <button class="menu" aria-expanded="false" aria-controls="nav">☰</button>
                    <nav id="nav">
                        <a href="/">Home</a>
                        <a href="/blog/">Blog</a>
                        <a href="/#about">About</a>
                        <button data-theme>◐ Theme</button>
                    </nav>
                </div>
            </header>
            <main id="main">
        ';
    }

function foot():void{
    echo '</main><footer><div class="container foot"><div><a class="brand" href="/"><b>N</b>'.e(SITE_NAME).'</a><p>Independent notes on technology, design, and the web.</p></div><div><a href="/blog/">Articles</a> · <a href="/#about">About</a></div></div><div class="container fine">© '.date('Y').' '.e(SITE_NAME).'</div></footer><script src="/js/app.js" defer></script></body></html>';}

function card(array $p):void{
    echo '<article class="card"><a class="cover" href="/blog/'.e($p['slug']).'/"><img src="'.e($p['coverImage']).'" alt="" loading="lazy"></a><div class="card-body"><div class="meta"><span>'.e($p['category']).'</span><time>'.e(datef($p['date'])).'</time></div><h3><a href="/blog/'.e($p['slug']).'/">'.e($p['title']).'</a></h3><p>'.e($p['description']).'</p><div class="card-foot"><span>'.e($p['author']).'</span><a href="/blog/'.e($p['slug']).'/">Read →</a></div></div></article>';}

