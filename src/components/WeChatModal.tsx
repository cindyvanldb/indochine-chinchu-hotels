import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { WeChatIcon } from './ContactIcons';

interface WeChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  initialBranch?: 'indochine' | 'chinchu';
}

export const WeChatModal: React.FC<WeChatModalProps> = ({
  isOpen,
  onClose,
  language,
  initialBranch = 'indochine',
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const translations = {
    vi: {
      title: 'Kết Nối Qua WeChat (微信)',
      subtitle: 'Hỗ trợ khách lưu trú quốc tế và trong nước 24/7 qua WeChat cho cả 2 cơ sở:',
      branch1Name: 'Indochine Casa (04 Thái Ly)',
      branch1Desc: 'Phường Thảo Điền, TP. Thủ Đức, TP.HCM',
      branch2Name: 'Chinchu Stay (46 Nguyễn Cừ & 24 Xuân Thủy)',
      branch2Desc: 'Phường Thảo Điền, TP. Thủ Đức, TP.HCM',
      wechatIdLabel: 'WeChat ID / Số điện thoại:',
      copyButton: 'Sao chép ID',
      copiedButton: 'Đã sao chép ID!',
      openWeChat: 'Mở ứng dụng WeChat',
      instructionTitle: 'Hướng dẫn kết bạn nhanh trên WeChat:',
      instruction1: 'Mở ứng dụng WeChat trên điện thoại của bạn.',
      instruction2: 'Nhấn vào dấu "+" ở góc trên bên phải, chọn "Add Contacts" (Thêm bạn bè).',
      instruction3: 'Dán WeChat ID hoặc số điện thoại (+84...) vừa sao chép để nhắn tin trực tiếp với lễ tân.',
      close: 'Đóng',
      reception247: 'Lễ tân trực tuyến 24/7',
    },
    en: {
      title: 'Connect via WeChat (微信)',
      subtitle: '24/7 concierge assistance on WeChat for our 2 boutique hotel properties:',
      branch1Name: 'Indochine Casa (04 Thai Ly)',
      branch1Desc: 'Thao Dien Ward, Thu Duc City, HCMC',
      branch2Name: 'Chinchu Stay (46 Nguyen Cu & 24 Xuan Thuy)',
      branch2Desc: 'Thao Dien Ward, Thu Duc City, HCMC',
      wechatIdLabel: 'WeChat ID / Phone Number:',
      copyButton: 'Copy ID',
      copiedButton: 'Copied ID!',
      openWeChat: 'Open WeChat App',
      instructionTitle: 'How to add our reception on WeChat:',
      instruction1: 'Open the WeChat application on your smartphone.',
      instruction2: 'Tap the "+" icon in the top right corner and select "Add Contacts".',
      instruction3: 'Paste the copied WeChat ID or phone number to chat directly with our front desk.',
      close: 'Close',
      reception247: '24/7 Front Desk Online',
    },
    ko: {
      title: '위챗(WeChat / 微信) 실시간 상담',
      subtitle: '2개 지점 프런트 데스크에서 24시간 실시간 위챗 상담을 제공합니다:',
      branch1Name: '인도차이나 카사 (04 Thai Ly)',
      branch1Desc: '타오디엔, 투득시, 호치민',
      branch2Name: '친추 스테이 (46 Nguyen Cu & 24 Xuan Thuy)',
      branch2Desc: '타오디엔, 투득시, 호치민',
      wechatIdLabel: 'WeChat ID / 전화번호:',
      copyButton: 'ID 복사',
      copiedButton: '복사 완료!',
      openWeChat: 'WeChat 앱 열기',
      instructionTitle: 'WeChat 친구 추가 방법:',
      instruction1: '스마트폰에서 WeChat 앱을 엽니다.',
      instruction2: '우측 상단의 "+" 버튼을 누르고 "친구 추가(Add Contacts)"를 선택합니다.',
      instruction3: '복사한 위챗 ID 또는 번호를 검색하여 프런트 데스크와 즉시 대화하세요.',
      close: '닫기',
      reception247: '24시간 프런트 대기',
    },
    zh: {
      title: '微信在线客服 (WeChat / 微信)',
      subtitle: '24小时前台双语管家在线，为您提供草田两大酒店分店即时入住咨询与预订服务：',
      branch1Name: 'Indochine Casa (04 Thai Ly)',
      branch1Desc: '草田坊，守德市，胡志明市',
      branch2Name: 'Chinchu Stay (46 Nguyen Cu & 24 Xuan Thuy)',
      branch2Desc: '草田坊，守德市，胡志明市',
      wechatIdLabel: '微信号 / 手机号 (WeChat ID):',
      copyButton: '一键复制微信号',
      copiedButton: '已复制微信号！',
      openWeChat: '打开微信应用',
      instructionTitle: '如何添加前台微信好友：',
      instruction1: '在手机中打开微信 (WeChat)。',
      instruction2: '点击右上角 "+" 号，选择 "添加朋友" (Add Contacts)。',
      instruction3: '粘贴刚刚复制的微信号或手机号码即可立即联系前台管家。',
      close: '关闭',
      reception247: '24小时前台在线守候',
    },
  };

  const t = translations[language] || translations.vi;

  const branches = [
    {
      id: 'indochine',
      name: t.branch1Name,
      desc: t.branch1Desc,
      wechatId: '0708570838',
      phoneDisplay: '+84 708 570 838',
      color: 'bg-emerald-900 border-emerald-700/40 text-emerald-100',
      tagColor: 'bg-emerald-800/80 text-emerald-200 border-emerald-600/50',
    },
    {
      id: 'chinchu',
      name: t.branch2Name,
      desc: t.branch2Desc,
      wechatId: '0966572935',
      phoneDisplay: '+84 966 572 935',
      color: 'bg-stone-900 border-stone-700/50 text-stone-100',
      tagColor: 'bg-stone-800 text-amber-300 border-stone-600/50',
    },
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wechat-modal-title"
      >
        {/* Header with WeChat Brand Green */}
        <div className="bg-gradient-to-r from-[#07C160] to-[#059648] px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shadow-inner">
              <WeChatIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 id="wechat-modal-title" className="text-lg font-bold font-serif-luxury tracking-tight leading-tight">
                {t.title}
              </h3>
              <span className="text-[11px] text-emerald-100 font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                {t.reception247}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/15 hover:bg-black/25 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {t.subtitle}
          </p>

          {/* 2 Branches Contact Cards */}
          <div className="space-y-3.5">
            {branches.map((b) => {
              const isCopied = copiedId === b.id;
              return (
                <div
                  key={b.id}
                  className="p-4 rounded-2xl bg-stone-50 border border-stone-200 hover:border-emerald-500/50 transition-colors shadow-xs"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-stone-900 leading-tight">
                      {b.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">
                      24/7 Support
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-500 mb-3">
                    {b.desc}
                  </div>

                  {/* WeChat ID Field with Copy Button */}
                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white border border-stone-200">
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase font-bold text-stone-400">
                        {t.wechatIdLabel}
                      </div>
                      <div className="font-mono text-sm sm:text-base font-bold text-stone-900 tracking-wider">
                        {b.wechatId}
                        <span className="text-xs font-normal text-stone-400 ml-2">({b.phoneDisplay})</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopy(b.id, b.wechatId)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-xs ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#07C160] hover:bg-[#06a652] text-white'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>{t.copiedButton}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{t.copyButton}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick instructions */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-xs space-y-1.5 text-stone-700">
            <div className="font-bold text-emerald-950 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t.instructionTitle}</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-[11px] sm:text-xs text-stone-600 pl-0.5">
              <li>{t.instruction1}</li>
              <li>{t.instruction2}</li>
              <li>{t.instruction3}</li>
            </ol>
          </div>

          {/* Action button */}
          <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
            <a
              href="weixin://"
              className="flex-1 py-3 px-4 rounded-xl bg-[#07C160] hover:bg-[#06a652] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <WeChatIcon className="w-4 h-4" />
              <span>{t.openWeChat}</span>
            </a>
            <button
              onClick={onClose}
              className="py-3 px-5 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              {t.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
