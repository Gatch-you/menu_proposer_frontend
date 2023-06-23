import { text } from 'node:stream/consumers'
import React, {useState, useEffect} from 'react'


const HomePage = () => {
  return (
    <div>
      <h1>MyCookBook</h1>
      <h2> </h2>
      <div style={{ textAlign: 'left' }}>
        <p> 
          MyCookBookは、あなたの料理のアイデアを記録し、レシピの考案、食材の在庫管理するための便利なアプリケーションです。
        </p>
        <p style={{ textAlign: 'left' }}>
           新しいレシピを作成し、お気に入りの料理を保存し、使いたい食材をリストアップすることができます。また、賞味期限を管理することで食材のムダを減らし、効率的な調理プロセスをサポートします。
        </p>
        <p style={{ textAlign: 'left' }}>
           MyCookBookは、あなたの料理体験を向上させ、創造性を引き出すためのパートナーとなることでしょう。是非MyCookBookをご活用ください！！
        </p>
      </div>
    </div>
  )
}

export default HomePage